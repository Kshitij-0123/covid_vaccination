import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = ({csrfToken}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/bookings/user/signup/',
                { name, username, password },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            console.error('Signup error:', error);
            setMessage('Username already exists.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <br />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            <button onClick={handleSignUp}>Sign Up</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUpForm;
