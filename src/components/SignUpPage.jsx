import React, { useState } from 'react';
import { ChefHat, Mail, Lock, User, ArrowRight, Loader, AlertTriangle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const SignUpPage = ({ onSwitchToLogin, apiBaseUrl }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        // Client-side validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(`${apiBaseUrl}/api/auth/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            setSuccess('Registration successful! You can now log in.');
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen pt-16 pb-16 px-4 bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100">
            <div className="w-full max-w-md card-modern animate-fade-in hover:shadow-elegant transition-all duration-500">

                {/* Header Section with Enhanced Design */}
                <div className="text-center mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-t-3xl"></div>
                    <div className="relative z-10 pt-6 pb-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg animate-pulse-glow mb-4">
                            <ChefHat className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-wider mb-2">
                            SIGN UP
                        </div>
                        <p className="text-sm text-gray-600 italic font-medium">"Join TIFFIN ON TIME today!"</p>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-6 px-2">

                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 text-sm font-semibold tracking-wide" htmlFor="name">
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-modern w-full pr-12"
                                placeholder="Enter your full name"
                                required
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 text-sm font-semibold tracking-wide" htmlFor="email">
                            College Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-modern w-full pr-12"
                                placeholder="user@nmamit.in"
                                required
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Mail className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Must end with @nmamit.in</p>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 text-sm font-semibold tracking-wide" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-modern w-full pr-12"
                                placeholder="Min 8 chars, letters & numbers"
                                required
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 text-sm font-semibold tracking-wide" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-modern w-full pr-12"
                                placeholder="Re-enter your password"
                                required
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in shadow-sm">
                            <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in shadow-sm">
                            <div className="flex items-center space-x-2">
                                <span>{success}</span>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="space-y-4 pt-2">
                        <button
                            type="submit"
                            className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform ${isSubmitting ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 active:scale-95 hover:shadow-xl animate-pulse-glow'}`}
                            disabled={isSubmitting}
                        >
                            <span className="flex items-center justify-center space-x-2">
                                {isSubmitting ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign Up</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Switch to Login */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={onSwitchToLogin}
                                className="text-sm text-indigo-600 hover:text-purple-600 font-medium transition-colors duration-200 flex items-center justify-center space-x-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Already have an account? Log in</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
