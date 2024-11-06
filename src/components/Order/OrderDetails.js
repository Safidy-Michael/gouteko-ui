import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../api/orderApi';
import { FaTimes } from 'react-icons/fa';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getOrderById(id); 
                setOrder(orderData); 
            } catch (error) {
                console.error('Error fetching order:', error); 
            }
        };
        fetchOrderDetails(); 
    }, [id]);

    const handleClose = () => {
        navigate(-1); 
    };

    if (!order) {
        return <p>Loading...</p>;
    }

    return (
        <div className="relative border border-gray-300 shadow-lg rounded-lg p-6 md:p-8 w-full md:w-2/3 mx-auto bg-white">
            {/* Bouton de fermeture */}
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <FaTimes size={20} />
            </button>

            <h1 className="text-2xl font-semibold text-center mb-4">Détails de la Commande</h1>
            <div className="border-b border-gray-200 pb-4 mb-4">
                <p className="text-lg"><strong>Nom de l'utilisateur:</strong> {order.userName}</p>
                <p className="text-lg"><strong>Adresse:</strong> {order.address}</p>
                <p className="text-lg"><strong>Date de la commande:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            </div>
            <h3 className="text-xl font-semibold mb-3">Produits Commandés:</h3>
            <ul className="space-y-2">
                {order.products.map((product, index) => (
                    <li key={index} className="border border-gray-200 p-2 rounded-md">
                        <span className="font-semibold">{product.productName}</span> - {product.quantity} {product.unit} à {product.unitPrice} ar
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <p className="text-lg font-semibold">
                    <strong>Montant total:</strong> 
                    <span className="ml-2 border border-gray-400 px-3 py-1 rounded-md bg-gray-50">
                        {order.totalAmount} ar
                    </span>
                </p>
            </div>
        </div>
    );
};

export default OrderDetails;
