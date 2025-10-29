import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ isLoggedIn, userRole, onLogout, onBackToHome, siteName }) => {
    return (
        <header className="sticky top-0 z-20 shadow-2xl gradient-header animate-slide-up navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center relative">

                {/* Logo/Site Name (Center) - Enhanced with gradient text */}
                <div className="flex-grow text-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 tracking-widest uppercase cursor-pointer whitespace-nowrap hover:scale-105 transition-all duration-300 drop-shadow-lg"
                        onClick={isLoggedIn ? onBackToHome : null}
                    >
                        {siteName}
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-2 rounded-full opacity-70"></div>
                </div>

                {/* Navigation/Auth (Top Right Corner) - Modern design */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:flex items-center space-x-2 text-white/90">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium capitalize tracking-wide">
                                    {userRole} Active
                                </span>
                            </div>
                            <button
                                onClick={onLogout}
                                className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 border border-white/20"
                            >
                                <span className="hidden sm:inline">Logout</span>
                                <LogOut className="w-5 h-5 sm:hidden" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-6">
                            <a
                                href="#"
                                className="text-white font-bold text-lg uppercase hover:text-blue-200 transition-all duration-300 tracking-wider relative group"
                            >
                                LOG IN
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                            <span className="text-white/50 text-lg font-bold">|</span>
                            <a
                                href="#"
                                className="text-white font-bold text-lg uppercase hover:text-purple-200 transition-all duration-300 tracking-wider relative group"
                            >
                                SIGN UP
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Decorative bottom border */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </header>
    );
};

export default Header;
