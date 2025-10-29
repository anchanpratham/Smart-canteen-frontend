import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, ArrowRight, AlertTriangle } from 'lucide-react';

const HotelList = ({ apiBaseUrl, onSelectHotel }) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/api/hotels`);
                const data = response.data && response.data.length > 0 ? response.data : [
                    { _id: 'h1', name: 'College Canteen', location: 'Main Building' },
                    { _id: 'h2', name: 'Harshitha ', location: 'Behind the Library' },
                    { _id: 'h3', name: 'Shri Ram Fast Food', location: 'Near Gate 2' },
                    { _id: 'h4', name: 'The Mess Hall', location: 'Hostel Block' },
                ];
                setHotels(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching hotels:", err);
                setHotels([
                    { _id: 'h1', name: 'College Canteen', location: 'Main Building' },
                    { _id: 'h2', name: 'Harshitha ', location: 'Behind the Library' },
                    { _id: 'h3', name: 'Shri Ram Fast Food', location: 'Near Gate 2' },
                    { _id: 'h4', name: 'The Mess Hall', location: 'Hostel Block' },
                ]);
                setError('Using fallback data. Failed to fetch from backend. Ensure Node.js server is running.');
                setLoading(false);
            }
        };
        fetchHotels();
    }, [apiBaseUrl]);

    // Enhanced color palette with gradients
    const getHotelGradient = (index) => {
        const gradients = [
            'from-blue-500 to-indigo-600',
            'from-purple-500 to-pink-600',
            'from-green-500 to-teal-600',
            'from-orange-500 to-red-600',
            'from-cyan-500 to-blue-600',
            'from-rose-500 to-pink-600'
        ];
        return gradients[index % gradients.length];
    };

    const getHotelIcon = (index) => {
        const icons = ['🍽️', '🍛', '🥘', '🍜', '🍕', '🍔'];
        return icons[index % icons.length];
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-2xl font-bold text-indigo-700 animate-pulse">Getting your options ready...</p>
        </div>
    );

    if (hotels.length === 0) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <div className="text-6xl mb-6">🍽️</div>
                <p className="text-4xl font-bold text-gray-600 mb-4">No Food Options Available</p>
                <p className="text-xl text-gray-500">Please contact the admin or check back later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 w-full animate-fade-in">

            {/* Enhanced Header Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg mb-6 animate-bounce-subtle">
                    <span className="text-3xl">🍽️</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 mb-6 tracking-wider uppercase">
                    HUNGRY?
                </h2>
                <p className="text-xl sm:text-2xl font-semibold text-gray-600 mb-8">
                    Choose your favorite spot and let's get you fed!
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-12 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-yellow-800 px-8 py-6 rounded-2xl text-sm font-medium shadow-lg animate-fade-in max-w-2xl mx-auto">
                    <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {/* Modern Hotel Grid */}
            <div className="d-flex justify-content-center">
                <div className="row g-4 justify-content-center">
                    {hotels.map((hotel, index) => {
                        const gradient = getHotelGradient(index);
                        const icon = getHotelIcon(index);
                        return (
                            <div
                                key={hotel._id}
                                className="col-md-8 col-lg-6 mb-4"
                                style={{ maxWidth: '700px' }}
                            >
                                <div
                                    className="card shadow-sm rounded cursor-pointer"
                                    onClick={() => onSelectHotel(hotel._id, hotel.name)}
                                >
                                    <div className="card-body p-3 text-center">
                                        {/* Icon */}
                                        <div className="text-5xl mb-3">
                                            {icon}
                                        </div>

                                        {/* Hotel Name */}
                                        <h3 className="card-title h5 mb-2">
                                            {hotel.name}
                                        </h3>

                                        {/* Location */}
                                        <p className="card-text small text-muted mb-3">
                                            <MapPin className="w-4 h-4 me-1" />
                                            {hotel.location || 'Location not specified'}
                                        </p>

                                        {/* CTA Button */}
                                        <button className="btn btn-primary w-100">
                                            Order Here
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Enhanced Call to Action */}
            <div className="text-center mt-16 animate-slide-up">
                <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-4 rounded-full shadow-lg border border-indigo-100">
                    <span className="text-2xl animate-bounce">⚡</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide">
                        What's stopping you? Pre-order now!
                    </h3>
                    <span className="text-2xl animate-bounce">⚡</span>
                </div>
            </div>
        </div>
    );
};

export default HotelList;
