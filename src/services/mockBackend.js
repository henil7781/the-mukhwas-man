import products from '../data/products.json';

// Initial Inventory Data - Populated from products.json
const INITIAL_INVENTORY = products.map(p => ({
    ...p,
    stock: p.stock !== undefined ? p.stock : 50, // Use stock from JSON or default
    lowStockThreshold: 10
}));

const STORAGE_KEYS = {
    ORDERS: 'mukhwas_orders',
    INVENTORY: 'mukhwas_inventory_v2',
    USERS: 'mukhwas_users_db',
};

export const mockBackend = {
    // --- USERS ---
    getUsers: () => {
        const users = localStorage.getItem(STORAGE_KEYS.USERS);
        return users ? JSON.parse(users) : [];
    },

    registerUser: (userData) => {
        const users = mockBackend.getUsers();
        if (users.find(u => u.email === userData.email)) {
            throw new Error("User with this email already exists.");
        }
        const newUser = {
            ...userData,
            id: `USER-${Date.now()}`,
            createdAt: new Date().toISOString() // Explicit timestamp
        };
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return newUser;
    },

    authenticateUser: (email, password) => {
        const users = mockBackend.getUsers();
        const user = users.find(u => u.email === email);
        if (!user) {
            throw new Error("User not found.");
        }

        if (user.password !== password) {
            throw new Error("Invalid password.");
        }

        return user;
    },

    getUserAnalytics: () => {
        const users = mockBackend.getUsers();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const chartData = days.map(day => ({ date: day, count: 0 }));

        users.forEach(user => {
            if (user.createdAt) {
                const date = new Date(user.createdAt);
                // Simple logic: if created within last 7 days, mapping by day name
                // Ideally we'd map by specific date, but day name matches Sales Chart style
                const dayName = days[date.getDay()];
                const dayIndex = days.indexOf(dayName);
                if (dayIndex !== -1) {
                    chartData[dayIndex].count += 1;
                }
            }
        });

        return {
            totalUsers: users.length,
            chartData
        };
    },

    // --- ORDERS ---
    getOrders: () => {
        const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return orders ? JSON.parse(orders) : [];
    },

    addOrder: (orderData) => {
        const orders = mockBackend.getOrders();

        // Simulate User Path / Traffic Source
        const paths = ['Instagram Ad', 'Google Search', 'Direct Website', 'Facebook Ad', 'Friend Referral'];
        const randomPath = paths[Math.floor(Math.random() * paths.length)];

        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 1000000)}`,
            date: new Date().toISOString(),
            status: 'Pending',
            trackingId: '',
            userPath: randomPath, // NEW: Track where they came from
            ...orderData
        };

        // Prepend to list (newest first)
        const updatedOrders = [newOrder, ...orders];
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));

        // Update Inventory
        mockBackend.updateInventoryOnOrder(newOrder.items);

        return newOrder;
    },

    updateOrderStatus: (orderId, newStatus) => {
        const orders = mockBackend.getOrders();
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
        return updatedOrders;
    },

    updateTrackingId: (orderId, trackingId) => {
        const orders = mockBackend.getOrders();
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, trackingId } : order
        );
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
    },

    // --- CUSTOMERS ---
    getCustomers: () => {
        const orders = mockBackend.getOrders();
        const inventory = mockBackend.getInventory(); // To mock searches from real product names
        const customersMap = {};

        orders.forEach(order => {
            if (!customersMap[order.customerName]) {
                // Generate mock searches (random 2-3 products they DIDN'T buy or just random)
                const randomSearches = [];
                for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
                    const randomProd = inventory[Math.floor(Math.random() * inventory.length)];
                    if (randomProd) randomSearches.push(randomProd.name);
                }

                customersMap[order.customerName] = {
                    id: `CUST-${Math.floor(Math.random() * 10000)}`,
                    name: order.customerName,
                    email: order.email || 'customer@example.com',
                    totalSpend: 0,
                    totalOrders: 0,
                    lastOrderDate: null,
                    acquisitionPath: order.userPath || 'Direct Website',
                    purchasedItems: new Set(), // Track unique items bought
                    recentSearches: randomSearches // Mock data
                };
            }
            const cust = customersMap[order.customerName];
            cust.totalSpend += order.total;
            cust.totalOrders += 1;

            // Add items to purchase history
            order.items.forEach(item => cust.purchasedItems.add(item.name));

            // Keep most recent date
            if (!cust.lastOrderDate || new Date(order.date) > new Date(cust.lastOrderDate)) {
                cust.lastOrderDate = order.date;
            }
        });

        // Convert Set to Array for UI
        return Object.values(customersMap).map(c => ({
            ...c,
            purchasedItems: Array.from(c.purchasedItems)
        }));
    },

    // --- INVENTORY ---
    getInventory: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.INVENTORY);

        // 1. If nothing stored, return initial
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
            return INITIAL_INVENTORY;
        }

        const storedInventory = JSON.parse(stored);

        // 2. Sync Logic: Merge updates from json into storage
        // This ensures if we update prices/stock in code, the user sees it even if they have old LS data.
        let hasChanges = false;

        // Map stored items for easy lookup
        const storedMap = new Map(storedInventory.map(item => [item.id, item]));

        const syncedInventory = INITIAL_INVENTORY.map(newItem => {
            const existing = storedMap.get(newItem.id);
            if (existing) {
                // Merge existing (to keep dynamic stock potentially) BUT force update baseline fields
                // Here we prioritize JSON for static fields, but we might want to keep 'stock' if it was decremented?
                // For this specific 'Low Stock' feature implementation, we WANT to force the low stock values.
                // In a real app, we'd have a more complex sync. For now, let's force sync 'stock' if it's the specific test cases.

                // If the JSON stock is drastically different (e.g. 8 vs 50), let's assume it's a dev update.
                let stock = existing.stock;
                if (newItem.stock !== 50 && existing.stock === 50) {
                    // If JSON has specific low stock (8, 3) and LS has default (50), take JSON.
                    stock = newItem.stock;
                    hasChanges = true;
                }

                return {
                    ...existing,
                    ...newItem, // Apply JSON updates (name, price, etc)
                    stock: stock // Preserved intelligent stock logic
                };
            } else {
                hasChanges = true;
                return newItem;
            }
        });

        // 3. If we changed anything, save back to storage
        if (hasChanges || syncedInventory.length !== storedInventory.length) {
            localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(syncedInventory));
            return syncedInventory;
        }

        return storedInventory;
    },

    updateProduct: (id, updates) => {
        const inventory = mockBackend.getInventory();
        const updatedInventory = inventory.map(item =>
            item.id === id ? { ...item, ...updates } : item
        );
        localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(updatedInventory));
        return updatedInventory;
    },

    updateInventoryOnOrder: (items) => {
        let inventory = mockBackend.getInventory();
        // Simple logic: match by name roughly or just assume ID mapping if we had it perfect.
        // For this demo, we'll try to match by Name since IDs might vary in cart.

        items.forEach(cartItem => {
            inventory = inventory.map(invItem => {
                if (cartItem.name.includes(invItem.name) || invItem.name.includes(cartItem.name)) {
                    return { ...invItem, stock: Math.max(0, invItem.stock - cartItem.quantity) };
                }
                return invItem;
            });
        });

        localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
    },

    // --- ANALYTICS ---
    // --- ANALYTICS ---
    getSalesChartData: () => {
        const orders = mockBackend.getOrders();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // Initialize last 7 days with 0
        const chartData = days.map(day => ({ date: day, sales: 0 }));

        orders.forEach(order => {
            const date = new Date(order.date);
            const dayName = days[date.getDay()];
            const dayIndex = days.indexOf(dayName);
            if (dayIndex !== -1) {
                // Ensure we interact with numbers
                const orderTotal = parseFloat(order.total) || 0;
                chartData[dayIndex].sales += orderTotal;
            }
        });
        return chartData;
    },

    getDashboardStats: () => {
        const orders = mockBackend.getOrders();
        const inventory = mockBackend.getInventory();

        // 1. Total Revenue
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        // 2. Orders Today
        const today = new Date().toDateString();
        const ordersToday = orders.filter(o => new Date(o.date).toDateString() === today).length;

        // 3. Low Stock Items
        const lowStockItems = inventory.filter(i => i.stock <= i.lowStockThreshold);

        // 4. New Customers (Unique names)
        const uniqueCustomers = new Set(orders.map(o => o.customerName)).size;

        // 5. Sales Data for Chart (Last 7 days mock + real)
        // For demo purposes, we will return a mixed static + dynamic structure
        // Real apps would aggregate this by date.

        return {
            totalRevenue,
            ordersToday,
            lowStockItems,
            newCustomers: uniqueCustomers,
            recentOrders: orders.slice(0, 5)
        };
    }
};
