import products from '../data/products.json';

// Initial Inventory Data - Populated from products.json
const INITIAL_INVENTORY = products.map(p => ({
    id: p.id,
    name: p.name,
    stock: 50, // Default stock
    lowStockThreshold: 10,
    price: p.price
}));

const STORAGE_KEYS = {
    ORDERS: 'mukhwas_orders',
    INVENTORY: 'mukhwas_inventory',
};

export const mockBackend = {
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

        // 2. Sync Logic: Check for new products in json that are NOT in storage
        let hasChanges = false;
        const syncedInventory = [...storedInventory];

        INITIAL_INVENTORY.forEach(newItem => {
            const exists = storedInventory.find(existing => existing.id === newItem.id);
            if (!exists) {
                syncedInventory.push(newItem);
                hasChanges = true;
            }
        });

        // 3. If we added new items, save back to storage
        if (hasChanges) {
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
