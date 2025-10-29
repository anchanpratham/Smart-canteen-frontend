import React, { useState } from 'react';
import { ChefHat, Mail, Lock, ArrowRight, Loader, AlertTriangle, Utensils } from 'lucide-react';
import axios from 'axios';

const LoginPage = ({ onLogin, onSwitchToSignUp, apiBaseUrl }) => {
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

            // Login successful
            const userRole = response.data.user.role;
            onLogin(userRole);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-4 py-8">
            <div className="card shadow mx-auto" style={{ maxWidth: '28rem' }}>
                <div className="card-body p-4">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                        <Utensils className="w-8 h-8 text-orange-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">TIFFIN ON TIME</h1>
                    <p className="text-2xl font-semibold text-orange-600" style={{ fontFamily: 'Poppins, sans-serif' }}>"Order now, your idli is waiting for you!"</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="mb-3">

                    {/* Email Input */}
                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Email"
                                required
                                disabled={isSubmitting}
                            />
                            <span className="input-group-text">
                                <Mail className="w-5 h-5" />
                            </span>
                        </div>
                        <div className="form-text">Try: admin@nmamit.in for admin access</div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Password"
                                required
                                disabled={isSubmitting}
                            />
                            <span className="input-group-text">
                                <Lock className="w-5 h-5" />
                            </span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <AlertTriangle className="w-5 h-5 me-2" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="d-grid mb-3">
                        <button
                            type="submit"
                            className={`btn btn-success ${isSubmitting ? 'disabled' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader className="w-5 h-5 me-2 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </div>

                    {/* Additional Links */}
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <a href="#" className="btn btn-outline-secondary btn-sm">
                            Forgot Password?
                        </a>
                        <button onClick={onSwitchToSignUp} className="btn btn-outline-secondary btn-sm">
                            Sign Up
                        </button>
                        <button onClick={() => window.location.hash = '#admin-login'} className="btn btn-outline-secondary btn-sm">
                            Admin Login
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
