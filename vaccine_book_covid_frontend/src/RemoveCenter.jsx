import React, { useState } from 'react';
import axios from 'axios';
import VaccinationCenters from './VaccinationCenters';

const RemoveCenter = () => {
    const [centerId, setCenterId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRemoveCenter = async () => {
        try {
            const response = await axios.delete('http://localhost:8000/bookings/admin/remove_center/', {
                data: { center_id: centerId },
            });
            setMessage(response.data.message);
            setError(null);
        } catch (error) {
            setMessage(null);
            setError('Error removing the center.');
        }
    };

    return (
        <div>
            <VaccinationCenters />
            <h2>Remove Center</h2>
            <input
                type="text"
                value={centerId}
                onChange={(e) => setCenterId(e.target.value)}
                placeholder="Center ID"
            />
            <button onClick={handleRemoveCenter}>Remove</button>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default RemoveCenter;
