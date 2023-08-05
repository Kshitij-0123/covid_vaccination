import React, { useState } from 'react';
import axios from 'axios';

const GetDosageDetails = () => {
    const [centerId, setCenterId] = useState('');
    const [dosageDetails, setDosageDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleGetDosageDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8000/bookings/admin/dosage_details/'
                //   {
                // center_id: centerId,
                //   }
            );
            console.log(response.data);
            setDosageDetails(response.data);
            setError(null);
        } catch (error) {
            setDosageDetails(null);
            setError('Error fetching dosage details.');
        }
    };

    return (
        <div>
            <h2>Get Dosage Details</h2>
            <input
                type="text"
                value={centerId}
                onChange={(e) => setCenterId(e.target.value)}
                placeholder="Center ID"
            />
            <button onClick={handleGetDosageDetails}>Get Details</button>
            {error && <p>{error}</p>}
            {dosageDetails && dosageDetails.map((center) => (
                <div key={center.center_id}>
                    <p>Center ID: {center.center_id}</p>
                    <p>Center Name: {center.center_name}</p>
                    <p>Total Dosage: {center.total_dosage}</p>
                </div>
            ))}
        </div>
    );
};

export default GetDosageDetails;
