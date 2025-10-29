import React from 'react';
import { Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>
            <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-indigo-600 mr-3" />
                    <span className="text-xl font-semibold text-gray-700">Get in Touch</span>
                </div>
                <p className="text-lg text-gray-600 mb-4">
                    Have questions or need assistance? Reach out to our support team.
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-2xl font-bold text-indigo-600">
                        tiffinontime@support.com
                    </p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    We're here to help with any inquiries about your orders or our services.
                </p>
            </div>
        </div>
    );
};

export default Contact;
