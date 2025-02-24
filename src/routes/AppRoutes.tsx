import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes as well
import Landing from '../pages/Landing'; // Ensure correct import
import Game from '../pages/Game';

const AppRoutes: React.FC = () => {
    return (
        <Routes> 
            <Route path="/" element={<Landing />} /> 
            <Route path="/game" element={<Game />} />
        </Routes>
    );
};

export default AppRoutes;
