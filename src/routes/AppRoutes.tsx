import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes as well
import Landing from '../pages/Landing'; // Ensure correct import
import Game from '../pages/Game';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const AppRoutes: React.FC = () => {
    return (
        <Routes> 
            <Route path="/" element={<Landing />} /> 
            <Route path="/game" element={<Game />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    );
};

export default AppRoutes;
