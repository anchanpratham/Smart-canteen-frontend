import React from 'react';

const ConfirmationPage = ({ details, selectedHotel, handleBackToHome }) => {

    if (!details || !details.orderId) {
        return (
            <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-xl text-center">
                <h3 className="text-3xl font-extrabold text-red-600 mb-4">Order Status Unknown</h3>
                <p className="text-gray-700 mb-6">There was an issue retrieving the order details. Please check your backend logs.</p>
                <button
                    onClick={handleBackToHome}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition active:scale-95"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg">
                        <div className="card-body p-5">
                            {/* Food-related graphic */}
                            <div className="mb-4">
                                <svg className="w-75 mx-auto d-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6m0 0l5-5m-5 5l5 5"></path>
                                    <circle cx="12" cy="12" r="3" fill="currentColor" className="text-success"></circle>
                                </svg>
                            </div>

                            <h2 className="card-title h2 mb-4 fw-bold">Order Confirmed!</h2>

                            <p className="text-muted mb-4">Your tiffin pre-order and seat reservation have been successfully placed with <span className="fw-bold text-primary">{selectedHotel?.name}</span>.</p>

                            <div className="bg-light p-4 rounded mb-4">
                                <p className="fw-bold h5 text-success mb-3">Confirmation Details:</p>
                                <div className="row g-2">
                                    <div className="col-12 d-flex justify-content-between align-items-center bg-white p-2 rounded">
                                        <span className="fw-semibold">Order ID:</span>
                                        <span className="font-mono fw-bold text-primary">{details.orderId}</span>
                                    </div>
                                    <div className="col-12 d-flex justify-content-between align-items-center bg-white p-2 rounded">
                                        <span className="fw-semibold">Total Amount:</span>
                                        <span className="fw-bold text-success">₹{details.totalPrice?.toFixed(2) || 'N/A'}</span>
                                    </div>
                                    <div className="col-12 d-flex justify-content-between align-items-center bg-white p-2 rounded">
                                        <span className="fw-semibold">Seats Reserved:</span>
                                        <span className="fw-bold text-primary">{details.seatsBooked || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBackToHome}
                                className="btn btn-success btn-lg w-100"
                            >
                                Close and Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
