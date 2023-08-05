import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setUser, setIsAdmin, csrfToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('user');
    // console.log(csrfToken);
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/bookings/${loginType}/login/`,
                { username, password },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data.user_id);
            setUser(response.data.user_id);
            setIsAdmin(loginType === 'admin');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <label>
                <input
                    type="radio"
                    value="user"
                    checked={loginType === 'user'}
                    onChange={() => setLoginType('user')}
                />
                User
            </label>
            <label>
                <input
                    type="radio"
                    value="admin"
                    checked={loginType === 'admin'}
                    onChange={() => setLoginType('admin')}
                />
                Admin
            </label>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
