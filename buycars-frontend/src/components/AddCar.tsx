import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AddCar.css';

const AddCar = () => {
    const navigate = useNavigate();
    const [model_name, setModelName] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/cars/inventory', {
                model_name,
                year,
                price,
                description: [description],
            });
            console.log('Car added:', response.data);

            navigate('/inventory');
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <div className="add-car-container">
            <h2>Add a New Car</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={model_name}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="Car Model"
                    required
                />
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year"
                    required
                />
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                ></textarea>
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
};

export default AddCar;
