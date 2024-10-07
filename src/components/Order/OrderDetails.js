import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../api/orderApi'; // Assurez-vous que cette fonction existe

const OrderDetails = () => {
    const { id } = useParams(); // Récupérer l'ID de l'URL
    const [order, setOrder] = useState(null); // État pour stocker les détails de la commande

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getOrderById(id); // Appel API pour récupérer les détails de la commande
                console.log('Order data:', orderData); // Vérification des données récupérées
                setOrder(orderData); // Stocker les données de la commande
            } catch (error) {
                console.error('Error fetching order:', error); // Gestion des erreurs
            }
        };

        fetchOrderDetails(); // Appel de la fonction pour récupérer les détails
    }, [id]); // Dépendance à l'ID

    if (!order) {
        return <p>Loading...</p>; // Affichage d'un message de chargement si les détails ne sont pas encore disponibles
    }

    return (
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            <h1>Détails de la Commande</h1>
            <div>
                <p><strong>Nom de l'utilisateur:</strong> {order.userName}</p>
                <p><strong>Adresse:</strong> {order.address}</p>
                <p><strong>Date de la commande:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                
            </div>
            <h3>Produits Commandés:</h3>
            <ul>
                {order.products.map((product, index) => (
                    <li key={index}>
                        {product.productName} - {product.quantity} {product.unit} à {product.unitPrice} arriary
                    </li>
                ))}
            </ul>
            <p><strong>Montant total:</strong> {order.totalAmount} arriary</p>
        </div>
    );
};

export default OrderDetails;
