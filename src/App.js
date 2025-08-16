    import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import LoginPage from './components/LoginPage';
    import SignupPage from './components/SignUpPage';
    import Dashboard from './components/Dashboard';
    import UserManagement from './components/User/UserManagement'; 
    import ProductManagement from './components/Product/ProductManagement'; 
    import OrderManagement from './components/Order/OrderManagement'; 
    import UserDetails from './components/User/UserDetails'; 
    import OrderDetails from './components/Order/OrderDetails';

    import './index.css';

    const App = () => {
        return (
            <Router>
                <div className="container mx-auto pt-24">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/products" element={<ProductManagement />} />
                        <Route path="/orders" element={<OrderManagement />} />
                        <Route path="/users/:id" element={<UserDetails />} />
                        <Route path="/orders/:id" element={<OrderDetails />} />
                    </Routes>
                </div>
            </Router>
        );
    };

    export default App;
