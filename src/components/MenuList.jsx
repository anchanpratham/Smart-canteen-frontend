// smart-canteen-frontend/src/components/MenuList.jsx (UPDATED FOR MULTI-VENDOR)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. ACCEPT hotelId and hotelName as props
const MenuList = ({ apiBaseUrl, hotelId, hotelName }) => { 
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderItems, setOrderItems] = useState({}); 
    const [seats, setSeats] = useState(1); 
    const [confirmation, setConfirmation] = useState(null); 

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // 2. CRITICAL: Use the specific hotel ID in the URL for the API call
                const response = await axios.get(`${apiBaseUrl}/api/menu/${hotelId}`); 
                setMenu(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch menu. Is the backend server running?');
                setLoading(false);
            }
        };
        fetchMenu();
    }, [apiBaseUrl, hotelId]); // Rerun effect when hotelId changes

    // Function to update the quantity of an item (unchanged)
    const handleQuantityChange = (itemId, name, price, change) => {
        setOrderItems(prevItems => {
            const currentItem = prevItems[itemId] || { name, price, quantity: 0 };
            const newQuantity = currentItem.quantity + change;

            if (newQuantity <= 0) {
                const newItems = { ...prevItems };
                delete newItems[itemId];
                return newItems;
            }
            return {
                ...prevItems,
                [itemId]: { name, price, quantity: newQuantity }
            };
        });
    };

    // Calculate total price based on selected items (unchanged)
    const calculateTotal = () => {
        return Object.values(orderItems).reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Function to submit the order (unchanged)
    const handleSubmitOrder = async () => {
        const total = calculateTotal();
        if (Object.keys(orderItems).length === 0 || seats < 1) {
            alert("Please select at least one item and one seat.");
            return;
        }

        const itemsPayload = Object.entries(orderItems).map(([menuItemId, data]) => ({
            menuItemId,
            name: data.name,
            quantity: data.quantity
        }));

        try {
            const payload = {
                items: itemsPayload,
                seatsBooked: seats,
                totalPrice: total,
            };

            const response = await axios.post(`${apiBaseUrl}/api/orders`, payload);
            setConfirmation(response.data);
            setOrderItems({}); 
            setSeats(1); 
        } catch (err) {
            alert(`Order failed: ${err.response?.data?.message || err.message}`);
        }
    };


    if (loading) return <p className="text-center mt-5">Loading menu...</p>;
    if (error) return <p className="text-center text-red-500 mt-5">{error}</p>;

    if (confirmation) {
        // ... (Confirmation display remains the same) ...
        return (
            <div className="bg-green-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
                <h2 className="text-3xl font-bold text-green-700 mb-4">Order Confirmed! 🎉</h2>
                <p className="text-gray-700 mb-2">Please show this code at the counter:</p>
                <div className="bg-green-700 text-white text-4xl p-4 rounded-md text-center font-mono tracking-wider">
                    {confirmation.orderId.slice(-6)}
                </div>
                <p className="mt-4">**Order ID:** {confirmation.orderId}</p>
                <p>Total Paid: **₹{confirmation.totalPrice.toFixed(2)}**</p>
                <p>Seats Reserved: **{confirmation.seatsBooked}**</p>
                <button 
                    onClick={() => setConfirmation(null)}
                    className="mt-6 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-150"
                >
                    Place New Order
                </button>
            </div>
        );
    }

    // Main Menu and Order Display
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
            {/* Left Column: Menu List */}
            <div className="lg:col-span-2">
                {/* 3. Display the hotel name dynamically */}
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
                    Menu for {hotelName || "Selected Hotel"} 
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menu.map(item => (
                        <div key={item._id} className="bg-white p-4 shadow rounded-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                            <p className="text-green-600 font-semibold mt-1">₹{item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 italic">Category: {item.category}</p>
                            
                            {/* Quantity Controls (unchanged) */}
                            <div className="mt-3 flex items-center space-x-2">
                                <button 
                                    onClick={() => handleQuantityChange(item._id, item.name, item.price, -1)}
                                    className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-150"
                                >
                                    -
                                </button>
                                <span className="text-lg font-bold w-6 text-center">
                                    {orderItems[item._id]?.quantity || 0}
                                </span>
                                <button 
                                    onClick={() => handleQuantityChange(item._id, item.name, item.price, 1)}
                                    className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-150"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Cart/Summary (unchanged) */}
            <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-xl sticky top-4 h-fit">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Your Order</h2>
                
                {Object.keys(orderItems).length === 0 ? (
                    <p className="text-gray-500 italic">Cart is empty. Select items to proceed.</p>
                ) : (
                    <>
                        <ul className="space-y-2 mb-4">
                            {Object.entries(orderItems).map(([id, item]) => (
                                <li key={id} className="flex justify-between text-gray-700 border-b border-gray-200 pb-1">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Seats Reservation */}
                        <div className="my-4 p-3 bg-white rounded-md shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Seats Required for Dining:
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={seats}
                                onChange={(e) => setSeats(Math.max(1, Number(e.target.value)))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Total and Submit */}
                        <div className="flex justify-between items-center text-xl font-bold pt-4 border-t mt-4">
                            <span>Total (Pay on App):</span>
                            <span>₹{calculateTotal().toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleSubmitOrder}
                            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-150"
                        >
                            Confirm Order & Reserve Seats
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuList;