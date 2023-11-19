import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom';
import './navbar.css'


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">ProTasker</div>
            <div className="menu">
                <ul>
                    <li>
                        <ReactRouterLink to="/dashboard">Tableau de bord</ReactRouterLink>
                    </li>
                    <li>
                        <ReactRouterLink to="/">Tâches</ReactRouterLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar
