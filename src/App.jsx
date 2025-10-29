import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import AdminLoginPage from './components/AdminLoginPage';
import HotelList from './components/HotelList';
import MenuPage from './components/MenuPage';
import ConfirmationPage from './components/ConfirmationPage';
import AdminDashboard from './components/AdminDashboard';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Support from './components/Support';

// --- Global Constants ---
const SITE_NAME = "TIFFIN ON TIME";
const API_BASE_URL = 'http://localhost:5000'; // ✅ CORRECT LINKING URL
const ADMIN_EMAIL = 'admin@nmamit.in'; // Mock Admin User

// =============================================================
// 5. MAIN APP COMPONENT
// =============================================================
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('guest'); // guest, student, or admin
    const [view, setView] = useState('login');
    const [isSignUp, setIsSignUp] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [confirmationDetails, setConfirmationDetails] = useState(null); // New state for order data

    // Handlers
    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
        setView(role === 'admin' ? 'admin-dashboard' : 'home');
    };

    const handleAdminLogin = () => {
        setIsLoggedIn(true);
        setUserRole('admin');
        setView('admin-dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('guest');
        setSelectedHotel(null);
        setConfirmationDetails(null); // Clear confirmation on logout
        setView('login');
        setIsSignUp(false);
    };

    const handleSwitchToSignUp = () => {
        setIsSignUp(true);
    };

    const handleSwitchToLogin = () => {
        setIsSignUp(false);
    };

    const handleSelectHotel = (hotelId, hotelName) => {
        setSelectedHotel({ id: hotelId, name: hotelName });
        setView('menu');
    };

    // NEW HANDLER: Switches to the full confirmation page
    const handlePlaceOrderSuccess = (details) => {
        setConfirmationDetails(details);
        setView('confirmation');
    };

    const handleBackToHome = () => {
        setSelectedHotel(null);
        setConfirmationDetails(null); // Clear confirmation when going home
        setView(userRole === 'admin' ? 'admin-dashboard' : 'home');
    };

    // Handle hash-based routing for admin login
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#admin-login') {
                setView('admin-login');
                window.location.hash = ''; // Clear hash
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Check on mount

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Determine background and layout styles
    const isLoginPage = view === 'login';
    const usePinkBackground = isLoginPage || view === 'confirmation' || view === 'home'; // Use pink background for home, login, and confirmation pages

    // --- Main Render Logic ---
    let mainContent;

    switch (view) {
        case 'login':
            mainContent = isSignUp ?
                <SignUpPage onSwitchToLogin={handleSwitchToLogin} apiBaseUrl={API_BASE_URL} /> :
                <LoginPage onLogin={handleLogin} onSwitchToSignUp={handleSwitchToSignUp} apiBaseUrl={API_BASE_URL} />;
            break;
        case 'admin-login':
            mainContent = <AdminLoginPage onAdminLogin={handleAdminLogin} onBackToLogin={() => setView('login')} apiBaseUrl={API_BASE_URL} />;
            break;
        case 'home':
            mainContent = (
                <HotelList
                    apiBaseUrl={API_BASE_URL}
                    onSelectHotel={handleSelectHotel}
                />
            );
            break;
        case 'menu':
            mainContent = <MenuPage
                            apiBaseUrl={API_BASE_URL}
                            selectedHotel={selectedHotel}
                            handlePlaceOrderSuccess={handlePlaceOrderSuccess}
                            handleBackToHome={handleBackToHome}
                          />;
            break;
        case 'confirmation':
            mainContent = <ConfirmationPage
                            details={confirmationDetails}
                            selectedHotel={selectedHotel}
                            handleBackToHome={handleBackToHome}
                          />;
            break;
        case 'admin-dashboard':
            mainContent = <AdminDashboard apiBaseUrl={API_BASE_URL} userRole={userRole} onLogout={handleLogout} />;
            break;
        case 'about':
            mainContent = <AboutUs />;
            break;
        case 'contact':
            mainContent = <Contact />;
            break;
        case 'support':
            mainContent = <Support />;
            break;
        default:
            mainContent = (
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-red-500 text-2xl font-bold">Error: View Not Found</h2>
                    <button onClick={handleLogout} className="mt-4 text-indigo-600 active:scale-95">Go to Login</button>
                </div>
            );
    }

    return (
        <div className={`min-h-screen flex flex-col font-sans ${usePinkBackground ? 'bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'} animate-fade-in`}>

            {/* 1. Styled Header with Gradient */}
            <Header
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                onLogout={handleLogout}
                onBackToHome={handleBackToHome}
                siteName={SITE_NAME}
            />

            {/* 2. Dynamic Content Area */}
            <main className="flex-grow w-full flex items-center justify-center p-4 py-8 sm:py-12">
                <div className={`${view === 'home' || view === 'admin' ? 'w-full max-w-7xl' : 'w-full max-w-6xl'} px-4`}>
                    {mainContent}
                </div>
            </main>

            {/* 3. Footer with Gradient */}
            <Footer setView={setView} />
        </div>
    );
}

export default App;
