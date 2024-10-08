import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../api/orderApi';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getOrderById(id); 
                console.log('Order data:', orderData); 
                setOrder(orderData); 
            } catch (error) {
                console.error('Error fetching order:', error); 
            }
        };

        fetchOrderDetails(); 
    }, [id]);

    if (!order) {
        return <p>Loading...</p>;
    }

    return (
        <div className=" border border-1 pt-6 md:p-8   md:text-left space-y-4 w-50  px-4 py-2  ">
            <h1>Détails de la Commande</h1>
            <div className="py-3">
                <p><strong>Nom de l'utilisateur:</strong> {order.userName}</p>
                <p><strong>Adresse:</strong> {order.address}</p>
                <p><strong>Date de la commande:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                
            </div>
            <h3>Produits Commandés:</h3>
            <ul>
                {order.products.map((product, index) => (
                    <li key={index}>
                        {product.productName} - {product.quantity} {product.unit} à {product.unitPrice} ar
                    </li>
                ))}
            </ul>
            <p><strong>Montant total:</strong> <span class="border border-dark px-2 py-1">{order.totalAmount} ar</span></p>
        </div>
    );
};

export default OrderDetails;
