# The Mukhwas Man - Project Documentation

## 📖 Project Overview
**The Mukhwas Man** is a premium e-commerce web application built for selling handcrafted digestive blends (Mukhwas). It features a generic public storefront and a password-protected admin dashboard, currently operating as a Single Page Application (SPA).

## 🛠 Technology Stack
-   **Frontend Core**: React 18, Vite (Build Tool).
-   **Styling**: Tailwind CSS (Royal Gold/Dark theme system).
-   **Animations**: Framer Motion (Page transitions, Cart drawer).
-   **Icons**: Lucide React.
-   **Routing**: React Router DOM v6.
-   **State Management**: React Context API (`CartContext`, `UserContext`).
-   **Data Persistence**: Browser LocalStorage (Simulating a database).

---

## 📂 Directory Structure & Detailed Breakdown

### 1. `src/main.jsx` & `src/App.jsx`
*   **`main.jsx`**: The entry point. Mounts the React app to the DOM.
*   **`App.jsx`**: **The Backbone**.
    *   **Function**: Sets up the Router and Global Context Providers (`UserProvider`, `CartProvider`).
    *   **Logic**: Defines all Routes.
        *   Wraps public routes (`/`, `/shop`, `/checkout`) in `UserLayout`.
        *   Wraps admin routes (`/admin/*`) in `ProtectedRoute`.

### 2. `src/context/` (Global State)
State that is accessible anywhere in the app.

#### **`CartContext.jsx`**
Manages the shopping cart.
*   **`addToCart(product, quantity)`**: Adds item. If item exists, updates quantity. Logic: `prevItems.map(...)`.
*   **`removeFromCart(id)`**: Filters out the item by ID.
*   **`updateQuantity(id, qty)`**: Updates count. If qty < 1, it removes the item.
*   **`cartTotal`**: Calculated property (`price * quantity`).
*   **Why used?**: So `Navbar` (badge count), `SideCart` (list), and `Checkout` (total) all see the same data.

#### **`UserContext.jsx`**
Manages User Authentication (Mock).
*   **`login(email, name)`**: Creates a user object.
    *   **Feature**: Logs a "Welcome Email" template to the browser Console simulating a backend email service.
*   **`logout()`**: Clears user from state and LocalStorage.
*   **`updateUser(data)`**: Updates profile info (address, phone).
*   **Why used?**: To toggle between "Login" and "Profile" buttons in Navbar and protect the Checkout flow.

### 3. `src/services/mockBackend.js` (The Brain)
Since there is no real server, this file acts as the database API.

*   **`INITIAL_INVENTORY`**: Loads from `products.json` on first run.
*   **`getInventory()`**: returns current stock levels.
*   **`updateInventoryOnOrder(orderItems)`**:
    *   **Logic**: Loops through purchase items and subtracts that quantity from `localStorage`. Returns `false` if stock is insufficient.
*   **`getDashboardStats()`**: Aggregates data for Admin Dashboard.
    *   Calculates Total Revenue.
    *   Counts Low Stock items (threshold < 10).
    *   Generates chart data for `SalesOverview`.
*   **`getCustomers()`**: Groups all orders by `email` to create unique Customer Profiles with purchase history.

### 4. `src/components/` (UI Building Blocks)

#### **`layout/`**
*   **`Navbar.jsx`**: Public navigation.
    *   **Props**: Smartly checks `useUser()` to show Avatar or Login Icon.
*   **`AdminLayout.jsx`**: The sidebar layout for Admin pages.
    *   **Logic**: Renders specific Sidebar for `/admin` routes. Independent of User Navbar.

#### **`home/`**
*   **`HeroSection.jsx`**: The big entry banner.
    *   **Visuals**: Uses `framer-motion` for the fade-in text and bouncing image.
*   **`ShopByMood.jsx`**: Category quick-filters (Dinner, Snack, Party).

#### **`admin/`**
*   **`SalesOverview.jsx`**: The Chart.
    *   **Tech**: Uses `recharts` library to render the Area Chart showing revenue trends.
*   **`OrderTable.jsx`**: Reusable table component to list orders with status badges (Pending/Delivered).

### 5. `src/pages/` (Screens)

#### **Public Pages**
*   **`Shop.jsx`**: The Product Catalog.
    *   **Logic**: Contains `searchTerm` and `activeCategory` state filters to sort the `products` list in real-time.
*   **`ProductDetails.jsx`**:
    *   **Logic**: Reads URL param `id` (via `useParams`), finds the product in JSON, and displays deep details (Ingredients, Benefits).
*   **`Checkout.jsx`**:
    *   **Logic**: Collects address. On Submit, calls `mockBackend.placeOrder()`.
    *   **Critical**: Clears Cart (`clearCart()`) upon success and redirects to `/order-success`.

#### **Admin Pages**
*   **`InventoryManager.jsx`**:
    *   **Feature**: "Edit Stock" Modal. Allows Admin to manually adjust Price and Quantity.
    *   **Logic**: Syncs changes back to `mockBackend` -> `localStorage`.
*   **`CustomerManager.jsx`**:
    *   **Feature**: "Activity Feed". Shows detailed history of what specific items a customer bought.
*   **`AdminSettings.jsx`**:
    *   **Feature**: Global Config. Allows changing "Low Stock Threshold" (e.g., from 10 to 5). Saved in LocalStorage.

### 6. `src/data/products.json`
*   The Source of Truth for product metadata (ID, Name, Image URL, Ingredients).
*   **Note**: Stock levels are NOT here; they are moved to `localStorage` by `mockBackend.js` to allow updates.

---

## 🔄 Data Flow Example: Buying a Product

1.  **User** clicks "Add to Cart" on `Shop.jsx`.
    *   `CartContext` receives action -> Updates internal state -> Saves to `localStorage['mukhwas_cart']`.
2.  **User** goes to `Checkout.jsx`.
    *   Fills form -> Clicks "Place Order".
3.  **Checkout Component**:
    *   Calls `mockBackend.placeOrder(cartItems)`.
4.  **MockBackend**:
    *   Reads current Inventory.
    *   Subtracts formatting quantities.
    *   Saves new Order to `localStorage['mukhwas_orders']`.
5.  **App**:
    *   Redirects to `/order-success`.
    *   Clears `CartContext`.
6.  **Admin**:
    *   Visits `InventoryManager`.
    *   `useEffect` calls `mockBackend.getInventory()`.
    *   Sees the updated (reduced) stock level.
