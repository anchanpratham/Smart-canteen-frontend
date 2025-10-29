import React from 'react';
import { Twitter, Instagram, Globe } from 'lucide-react';

const Footer = ({ setView }) => {
    const quotes = [
        "🍽️ Good food is the foundation of genuine happiness! 🌟",
        "🥘 Your favorite tiffin is just a click away! 📱",
        "🍛 Fresh, hot, and delicious - every time! 🔥",
        "🎓 College life just got tastier! 📚",
        "🍲 Pre-order now, eat later! ⏰"
    ];

    return (
        <footer className="gradient-footer text-white overflow-hidden shadow-inner mt-auto animate-slide-up bg-dark">
            <div className="py-6">
                {/* Animated Quote Marquee */}
                <div className="marquee-container">
                    <div className="marquee-text">
                        {quotes.map((quote, index) => (
                            <span key={index} className="mx-8">
                                {quote}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Links and Info */}
                <div className="container-fluid mt-6">
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                                TIFFIN ON TIME
                            </h3>
                            <p className="text-white/80 text-sm">
                                Your trusted college canteen partner
                            </p>
                        </div>

                        <div className="col-md-4 mb-4">
                            <h4 className="text-lg font-semibold text-white uppercase tracking-wide">
                                Quick Links
                            </h4>
                            <div className="d-flex flex-column align-items-center">
                                <button onClick={() => setView('about')} className="btn btn-link text-white/80 hover:text-white p-0 mb-1">
                                    About Us
                                </button>
                                <button onClick={() => setView('contact')} className="btn btn-link text-white/80 hover:text-white p-0 mb-1">
                                    Contact
                                </button>
                                <button onClick={() => setView('support')} className="btn btn-link text-white/80 hover:text-white p-0">
                                    Support
                                </button>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <h4 className="text-lg font-semibold text-white uppercase tracking-wide">
                                Connect
                            </h4>
                            <div className="d-flex justify-content-center space-x-4">
                                <a href="#" className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110">
                                    <Globe className="w-5 h-5" />
                                </a>
                            </div>
                            <p className="text-white/60 text-xs mt-4">
                                © 2025 TIFFIN ON TIME. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
