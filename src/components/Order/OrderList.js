import React, { useEffect, useState } from 'react';
import { getOrders } from '../../api/orderApi'; 

const OrderList = ({ onShowDetails }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error); 
                setError('Erreur lors de la récupération des commandes.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="py-4">
            <h2 className="py-4">Liste des Commandes</h2>
            <div className="row">
                {orders.map(order => (
                    <div key={order.id} className="col-md-4 mb-3">
                        <div className="p-3 border border-secondary rounded">
                            <p>{order.userName} - {order.totalAmount} ar</p>
                            <button 
                                onClick={() => onShowDetails(order.id)} 
                                className="btn btn-outline-danger bg-danger text-white px-2 py-1 rounded"
                            >
                                Show
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;
