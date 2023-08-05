import React, { useState } from 'react';
import axios from 'axios';
import VaccinationCenters from './VaccinationCenters';

const ApplySlot = ({ user }) => {
    const [centerId, setCenterId] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');

    const handleApplySlot = async () => {
        try {
            const response = await axios.post('http://localhost:8000/bookings/user/apply_slot/', { center_id: centerId, date, user_id: user });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Apply slot error:', error);
        }
    };

    return (
        <div>
            <VaccinationCenters />
            <h2>Apply for Slot</h2>
            <input type="text" value={centerId} onChange={(e) => setCenterId(e.target.value)} placeholder="Center ID" /><br />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />
            <button onClick={handleApplySlot}>Apply</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ApplySlot;
