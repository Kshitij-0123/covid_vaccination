import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VaccinationCenters = () => {
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await axios.get('http://localhost:8000/bookings/vaccination_centers/');
                setCenters(response.data);
            } catch (error) {
                console.error('Error fetching vaccination centers:', error);
            }
        };

        fetchCenters();
    }, []);

    return (
        <div>
            <h2>Available Vaccination Centers</h2>
            <ul>
                {centers.map((center) => (
                    <li key={center.id}>{center.name} - Center ID: {center.id}</li>
                ))}
            </ul>
        </div>
    );
};

export default VaccinationCenters;
