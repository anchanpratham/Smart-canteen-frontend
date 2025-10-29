import React, { useState } from 'react';
import { ChefHat, Mail, Lock, ArrowRight, Loader, AlertTriangle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const AdminLoginPage = ({ onAdminLogin, onBackToLogin, apiBaseUrl }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
                email,
                password
            });

            // Check if user is admin
            if (response.data.user.role !== 'admin') {
                setError('Access denied. Admin privileges required.');
                return;
            }

            // Admin login successful
            onAdminLogin();
        } catch (err) {
            setError(err.response?.data?.message || 'Admin login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen pt-16 pb-16 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
            <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700/50 animate-fade-in hover:shadow-2xl transition-all duration-500 p-8">

                {/* Back Button */}
                <button
                    onClick={onBackToLogin}
                    className="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 mb-4 transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                </button>

                {/* Header Section with Enhanced Design */}
                <div className="text-center mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30 to-gray-700/30 rounded-t-3xl"></div>
                    <div className="relative z-10 pt-6 pb-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full shadow-lg animate-pulse-glow mb-4">
                            <ChefHat className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 tracking-wider mb-2">
                            ADMIN PANEL
                        </div>
                        <p className="text-sm text-slate-300 italic font-medium">"Manage orders with authority!"</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-6 px-2">

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="block text-slate-300 text-sm font-semibold tracking-wide" htmlFor="email">
                            Admin Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pr-12 px-4 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-slate-700 text-white placeholder-slate-400"
                                placeholder="admin@nmamit.in"
                                required
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                <Mail className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="block text-slate-300 text-sm font-semibold tracking-wide" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pr-12 px-4 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-slate-700 text-white placeholder-slate-400"
                                placeholder="Admin password"
                                required
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                <Lock className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-700/50 text-red-300 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in shadow-sm">
                            <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="space-y-4 pt-2">
                        <button
                            type="submit"
                            className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform ${isSubmitting ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-700 hover:to-orange-800 active:scale-95 hover:shadow-xl'}`}
                            disabled={isSubmitting}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                {isSubmitting ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        <span>Authenticating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Admin Login</span>
                                        <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
