import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuPage = ({ apiBaseUrl, selectedHotel, handlePlaceOrderSuccess, handleBackToHome }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]); // [{ _id, name, price, quantity, menuItemId }]
    const [seatsToReserve, setSeatsToReserve] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const mockMenuItems = [
        { _id: 'h1-m1', name: 'Idli Vada Combo', price: 40, category: 'Breakfast' },
        { _id: 'h1-m2', name: 'Masala Dosa', price: 55, category: 'Snacks' },
        { _id: 'h1-m3', name: 'Veg Thali', price: 120, category: 'Indian' },
        { _id: 'h1-m4', name: 'Cold Coffee', price: 45, category: 'Drinks' },
        { _id: 'h1-m5', name: 'Gulab Jamun (2 pcs)', price: 30, category: 'Dessert' },
    ];

    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true);
            setError(null);
            if (!selectedHotel || !selectedHotel.id) {
                setError('No hotel selected.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${apiBaseUrl}/api/menu/${selectedHotel.id}`);

                if (response.data && response.data.length > 0) {
                    setMenuItems(response.data);
                } else {
                    setMenuItems(mockMenuItems);
                    setError('Using fallback data. API returned no items.');
                }
                setLoading(false);
            } catch (err) {
                console.error(`Error fetching menu for ${selectedHotel.name}:`, err);
                setMenuItems(mockMenuItems);
                setError('Using fallback data. Failed to connect to menu API. Check backend routes.');
                setLoading(false);
            }
        };
        fetchMenu();
    }, [apiBaseUrl, selectedHotel]);

    // --- Cart Management Functions ---
    const handleQuantityChange = (item, action) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(i => i._id === item._id);
            let newQuantity;

            if (action === 'ADD') {
                newQuantity = existingItem ? existingItem.quantity + 1 : 1;
            } else if (action === 'REMOVE') {
                newQuantity = existingItem ? existingItem.quantity - 1 : 0;
            } else if (action === 'SET_TO_ONE') {
                newQuantity = 1;
            } else {
                return prevCart;
            }

            newQuantity = Math.max(0, newQuantity);

            if (existingItem) {
                if (newQuantity === 0) {
                    return prevCart.filter(i => i._id !== item._id);
                }
                return prevCart.map(i =>
                    i._id === item._id ? { ...i, quantity: newQuantity } : i
                );
            } else if (newQuantity > 0) {
                return [...prevCart, {
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: newQuantity,
                    menuItemId: item._id
                }];
            }
            return prevCart;
        });
    };

    const getItemQuantity = (itemId) => {
        const item = cart.find(i => i._id === itemId);
        return item ? item.quantity : 0;
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // --- Order Submission ---

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            setSubmitError('Your cart is empty. Please add items before ordering.');
            return;
        }

        const totalPrice = calculateTotal();

        const itemsPayload = cart.map(item => ({
            menuItemId: item._id,
            quantity: item.quantity,
            name: item.name, // Required for Mongoose validation in your backend
        }));

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await axios.post(`${apiBaseUrl}/api/orders`, {
                hotelId: selectedHotel.id,
                items: itemsPayload,
                seatsBooked: seatsToReserve,
                totalPrice: totalPrice,
            });

            // Pass the details to the parent App component to switch views
            handlePlaceOrderSuccess(response.data);

        } catch (err) {
            console.error("Order submission failed:", err);
            const message = err.response?.data?.message || 'Order failed. Please check backend server status.';
            setSubmitError(message);
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-2xl font-bold text-indigo-700 animate-pulse">Loading delicious menu...</p>
        </div>
    );

    const groupedItems = menuItems.reduce((acc, item) => {
        const category = item.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    const totalAmount = calculateTotal();
    const isCartEmpty = cart.length === 0;

    return (
        <div className="container mx-auto" style={{ maxWidth: '42rem' }}>

            {/* Enhanced Header Section */}
            <div className="mb-4">
                <button
                    onClick={handleBackToHome}
                    className="btn btn-outline-secondary mb-3"
                >
                    <svg className="w-5 h-5 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to Restaurants
                </button>
                <h2 className="h2 mb-2">
                    Menu for {selectedHotel?.name || '...'}
                </h2>
                <p className="lead text-muted">Order your favorite college canteen food!</p>
            </div>

            {/* Error Messages */}
            {error && (
                <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-yellow-800 px-8 py-6 rounded-2xl text-sm font-medium shadow-lg animate-fade-in max-w-2xl">
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}
            {submitError && (
                <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-8 py-6 rounded-2xl font-medium shadow-lg animate-fade-in max-w-2xl">
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <span>{submitError}</span>
                    </div>
                </div>
            )}

            {/* Menu Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="card-modern">
                        {Object.keys(groupedItems).map(category => (
                            <div key={category} className="mb-3">
                                <h4 className="h4 mb-3">
                                    {category}
                                </h4>

                                <div>
                                    {groupedItems[category].map(item => {
                                        const currentQuantity = getItemQuantity(item._id);
                                        const isItemInCart = currentQuantity > 0;

                                        return (
                                            <div key={item._id} className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="flex-grow-1">
                                                    <span className="fw-bold">{item.name}</span>
                                                    <span className="text-success fw-bold ms-2">₹{item.price.toFixed(2)}</span>
                                                </div>

                                                {/* Add Button */}
                                                <button
                                                    onClick={() => handleQuantityChange(item, 'SET_TO_ONE')}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 card-modern bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="text-3xl">🛒</div>
                            <h3 className="text-3xl font-bold text-indigo-700 uppercase tracking-wide">Order Summary</h3>
                        </div>

                        {/* Cart Items List */}
                        <div className="space-y-4 mb-8 min-h-[120px]">
                            {cart.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">🍽️</div>
                                    <p className="text-gray-500 italic">Your cart is empty. Add some delicious food!</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item._id} className="flex justify-between items-center text-gray-700 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-200 transition-colors">
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-indigo-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Seats Reservation Input */}
                        <div className="mb-8 border-t-2 pt-6 border-indigo-200">
                            <label htmlFor="seats" className="block text-gray-700 font-bold mb-3 text-lg flex items-center space-x-2">
                                <span>🍽️</span>
                                <span>Seats to Reserve</span>
                            </label>
                            <input
                                id="seats"
                                type="number"
                                min="1"
                                value={seatsToReserve}
                                onChange={(e) => setSeatsToReserve(Math.max(1, parseInt(e.target.value) || 1))}
                                className="input-modern w-full text-lg font-semibold"
                                required
                            />
                        </div>

                        {/* Total Price */}
                        <div className="flex justify-between items-center text-3xl font-black text-gray-900 border-t-4 pt-6 mt-6 border-indigo-300 bg-white p-6 rounded-2xl shadow-lg">
                            <span className="text-gray-700">TOTAL:</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">₹{totalAmount.toFixed(2)}</span>
                        </div>

                        {/* Place Order Button */}
                        <button
                            onClick={handlePlaceOrder}
                            disabled={isCartEmpty || isSubmitting}
                            className={`w-full mt-8 py-5 rounded-2xl font-black text-white shadow-2xl transition-all duration-300 transform active:scale-95 text-lg uppercase tracking-wide ${
                                isCartEmpty || isSubmitting
                                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 hover:shadow-3xl animate-pulse-glow'
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Placing Order...</span>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center space-x-2">
                                    <span>Confirm Order & Reserve</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MenuPage;
