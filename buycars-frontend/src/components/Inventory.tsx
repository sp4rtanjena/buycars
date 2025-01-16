import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import api from '../services/api';
import './Inventory.css';

interface Car {
    title: string;
    year: number;
    price: number;
    color: string;
    mileage: number;
    power: number;
    maxSpeed: number;
    imageUrl: string;
    description: string[];
    kmOnOdometer: number;
    majorScratches: boolean;
    originalPaint: boolean;
    accidentsReported: number;
    previousOwners: number;
    registrationPlace: string;
}

const Inventory = () => {
    const [inventory, setInventory] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Use the navigate hook for routing
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await api.get('/cars/inventory');
                setInventory(response.data.inventory);
                setLoading(false);
            } catch (err) {
                setError('Failed to load inventory');
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    const handleAddCarClick = () => {
        // Navigate to the "Add Car" page when the button is clicked
        navigate('/add-car');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="inventory-container">
            <h2>Car Inventory</h2>

            {/* Add a button to navigate to the Add Car page */}
            <button onClick={handleAddCarClick} className="add-car-btn">
                Add a Car
            </button>

            <div className="inventory-list">
                {inventory.map((car, index) => (
                    <div key={index} className="car-card">
                        <img src={car.imageUrl} alt={car.title} className="car-image" />
                        <h3>{car.title}</h3>
                        <p><strong>Year:</strong> {car.year}</p>
                        <p><strong>Price:</strong> ${car.price}</p>
                        <p><strong>Color:</strong> {car.color}</p>
                        <p><strong>Mileage:</strong> {car.mileage} km</p>
                        <p><strong>Power:</strong> {car.power} HP</p>
                        <p><strong>Max Speed:</strong> {car.maxSpeed} km/h</p>
                        <p><strong>Description:</strong> {car.description.join(', ')}</p>
                        <button className="view-details-btn">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
