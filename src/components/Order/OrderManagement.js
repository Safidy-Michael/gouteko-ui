import React, { useEffect, useState } from 'react';
import { placeOrder, getOrders, updateOrder, deleteOrder } from '../../api/orderApi';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const token = localStorage.getItem('token');
const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const ordersData = await getOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
        }
    };

    const handleplaceOrder = async (order) => {
        try {
            await placeOrder(order);
            fetchOrders();
            setCurrentOrder(null);
        } catch (error) {
            console.error('Erreur lors de la création de la commande:', error);
        }
    };

    const handleUpdateOrder = async (order) => {
        try {
            await updateOrder(currentOrder.id, order);
            fetchOrders();
            setCurrentOrder(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la commande:', error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await deleteOrder(id);
            fetchOrders();
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
        }
    };

    const handleShowOrder = (orderId) => {
        if (orderId) {
            console.log('Navigating to order ID:', orderId);
            navigate(`/orders/${orderId}`,{
                header : {
                    'Authorization': `Bearer ${token}`
                }
            });
        } else {
            console.error('L\'ID de la commande est manquant');
        }
    };

    return (
        <div>
            <Navbar/>
            <OrderForm 
                onSubmit={currentOrder ? handleUpdateOrder : handleplaceOrder} 
                order={currentOrder} 
                setOrder={setCurrentOrder} 
            />
            <OrderList 
                orders={orders} 
                onDelete={handleDeleteOrder} 
                onShowDetails={handleShowOrder} 
            />
        </div>
    );
};

export default OrderManagement;
