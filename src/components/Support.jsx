import React from 'react';
import { HelpCircle } from 'lucide-react';

const Support = () => {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Support</h1>
            <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                    <HelpCircle className="w-8 h-8 text-indigo-600 mr-3" />
                    <span className="text-xl font-semibold text-gray-700">Need Help?</span>
                </div>
                <p className="text-lg text-gray-600 mb-4">
                    Our support team is ready to assist you with any issues or questions.
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-2xl font-bold text-indigo-600">
                        tiffinontime@support.com
                    </p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    Contact us for technical support, order issues, or general inquiries.
                </p>
            </div>
        </div>
    );
};

export default Support;
