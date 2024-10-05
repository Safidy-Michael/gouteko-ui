import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './components/User/UserManagement'; // Nouveau composant
import ProductManagement from './components/Product/ProductManagement'; // Nouveau composant
import OrderManagement from './components/Order/OrderManagement'; // Nouveau composant
import UserDetails from './components/User/UserDetails'; 

const App = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl mb-4">Gestion des Ressources</h1>
                <Routes>
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App; 