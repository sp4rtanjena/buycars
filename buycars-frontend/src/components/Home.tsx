import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    return (
        <div className="home-container">
            <nav className="navbar">
                <Link to="/inventory" className="nav-button">Inventory</Link>
                {/* Only show Login and Sign Up if the user is not logged in */}
                {!isLoggedIn && (
                    <>
                        <Link to="/login" className="nav-button">Login</Link>
                        <Link to="/signup" className="nav-button">Sign Up</Link>
                    </>
                )}
            </nav>
            <div className="content">
                <h1>Welcome to BuyCars</h1>
                <p>Your one-stop destination for buying and selling cars.</p>
            </div>
        </div>
    );
};

export default Home;
