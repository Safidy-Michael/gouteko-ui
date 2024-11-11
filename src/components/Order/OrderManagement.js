import React, { useEffect, useState } from 'react';
import { placeOrder, getOrders, updateOrder, deleteOrder } from '../../api/orderApi';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { MDBInput } from 'mdb-react-ui-kit';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [showForm, setShowForm] = useState(false);
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

    const handlePlaceOrder = async (order) => {
        try {
            await placeOrder(order);
            fetchOrders();
            setCurrentOrder(null);
            setShowForm(false);
        } catch (error) {
            console.error('Erreur lors de la création de la commande:', error);
        }
    };

    const handleUpdateOrder = async (order) => {
        try {
            await updateOrder(currentOrder.id, order);
            fetchOrders();
            setCurrentOrder(null);
            setShowForm(false);
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
            navigate(`/orders/${orderId}`, {
                header: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } else {
            console.error('L\'ID de la commande est manquant');
        }
    };

    return (
        <div className="p-4">
            <Navbar />
            <div className="flex justify-between items-center mb-4">
                <MDBInput
                    type="text"
                    placeholder="Rechercher des commandes"
                    className="border p-2"
                />
                <button
                    onClick={() => setShowForm(true)}
                    className="w-25 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
                >
                    + Ajouter une Commande
                </button>
            </div>

            {showForm ? (
                <OrderForm
                    onSubmit={currentOrder ? handleUpdateOrder : handlePlaceOrder}
                    order={currentOrder}
                    setOrder={setCurrentOrder}
                    onClose={() => setShowForm(false)}
                />
            ) : (
                <OrderList
                    orders={orders}
                    onDelete={handleDeleteOrder}
                    onShowDetails={handleShowOrder}
                />
            )}
        </div>
    );
};

export default OrderManagement;
