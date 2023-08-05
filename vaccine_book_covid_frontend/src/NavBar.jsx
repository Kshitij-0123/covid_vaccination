import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ loggedIn, isAdmin, onLogout }) => {
    console.log(loggedIn,isAdmin);
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {loggedIn && (
                    <>
                        {isAdmin ? (
                            <>
                                <li><Link to="/admin/getDosageDetails">Get Dosage Details</Link></li>
                                <li><Link to="/admin/removeCenter">Remove Center</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/user/applySlot">Apply for Slot</Link></li>
                                <li><Link to="/user/searchCenter">Search Centers</Link></li>
                            </>
                        )}
                        <li><button onClick={onLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
