import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AdminDashboard = ({ apiBaseUrl, userRole, onLogout }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/admin/orders`, {
                headers: {
                    'Role': 'admin'
                }
            });
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch orders. Ensure backend is running and correct headers are sent.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if user is admin
        if (userRole !== 'admin') {
            onLogout(); // Redirect to login if not admin
            return;
        }

        fetchOrders();

        // Set up real-time polling every 30 seconds
        const interval = setInterval(fetchOrders, 30000);

        return () => clearInterval(interval);
    }, [apiBaseUrl, userRole, onLogout]);

    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId);
        try {
            await axios.put(`${apiBaseUrl}/api/admin/orders/${orderId}/status`, {
                status: newStatus
            }, {
                headers: {
                    'Role': 'admin'
                }
            });
            // Refresh orders after update
            await fetchOrders();
        } catch (err) {
            setError('Failed to update order status. Please try again.');
        } finally {
            setUpdatingOrderId(null);
        }
    };

    if (loading) return <p className="text-center mt-8 text-indigo-700 font-bold">Loading pending orders...</p>;
    if (error) return <p className="text-center text-red-500 mt-8 font-bold">ERROR: {error}</p>;

    return (
        <div className="p-6 bg-white shadow-2xl rounded-3xl w-full max-w-5xl mx-auto animate-fade-in border border-gray-100">

            <h1 className="text-3xl font-bold text-red-700 mb-6 border-b pb-3">Canteen Admin Dashboard</h1>

            {orders.length === 0 ? (
                <p className="text-xl text-gray-500">No orders at this time.</p>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-4">All Orders ({orders.length})</h2>
                    {orders.map((order) => (
                        <div key={order._id} className="bg-gray-100 p-4 rounded-2xl mb-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-bold text-lg text-blue-800">Order ID: {order._id.slice(-6)}</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                                    order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                    order.status === 'Ready' ? 'bg-green-200 text-green-800' :
                                    'bg-blue-200 text-blue-800'
                                }`}>
                                    {order.status === 'Pending' && <Clock className="w-3 h-3" />}
                                    {order.status === 'Ready' && <CheckCircle className="w-3 h-3" />}
                                    {order.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                                    {order.status}
                                </span>
                            </div>
                            <p>User ID: <span className="font-semibold">{order.userId}</span></p>
                            <p>Seats Reserved: <span className="font-semibold">{order.seatsBooked}</span></p>
                            <p>Total: <span className="font-semibold">₹{order.totalPrice.toFixed(2)}</span></p>
                            <p className="mt-2 font-medium">Items:</p>
                            <ul className="list-disc ml-6 text-sm">
                                {order.items.map((item, index) => (
                                    <li key={index}>{item.name || item.menuItemId?.name} (x{item.quantity})</li>
                                ))}
                            </ul>
                            <p className="text-xs text-gray-500 mt-2">Time: {new Date(order.orderDate).toLocaleTimeString()}</p>
                            <div className="mt-3 flex gap-2">
                                {order.status === 'Pending' && (
                                    <button
                                        onClick={() => updateOrderStatus(order._id, 'Ready')}
                                        disabled={updatingOrderId === order._id}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {updatingOrderId === order._id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                        {updatingOrderId === order._id ? 'Updating...' : 'Mark as Ready'}
                                    </button>
                                )}
                                {order.status === 'Ready' && (
                                    <button
                                        onClick={() => updateOrderStatus(order._id, 'Completed')}
                                        disabled={updatingOrderId === order._id}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {updatingOrderId === order._id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                        {updatingOrderId === order._id ? 'Updating...' : 'Mark as Completed'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
