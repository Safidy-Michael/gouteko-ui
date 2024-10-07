import React, { useEffect, useState } from 'react';
import { createOrder, getOrders, updateOrder, deleteOrder } from '../../api/orderApi';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const navigate = useNavigate();

    // Récupérer la liste des commandes lors du chargement du composant
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

    const handleCreateOrder = async (order) => {
        try {
            await createOrder(order);
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
            navigate(`/orders/${orderId}`); // Navigue vers les détails de la commande avec le bon ID
        } else {
            console.error('L\'ID de la commande est manquant');
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4">Gestion des Commandes</h1>
            <OrderForm 
                onSubmit={currentOrder ? handleUpdateOrder : handleCreateOrder} 
                order={currentOrder} 
                setOrder={setCurrentOrder} 
            />
            <OrderList 
                orders={orders} 
                onDelete={handleDeleteOrder} 
                onShowDetails={handleShowOrder} // Passer la fonction pour afficher les détails
            />
        </div>
    );
};

export default OrderManagement;
