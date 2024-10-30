import React, { useEffect, useState } from 'react';
import { FaEllipsisV, FaEye } from 'react-icons/fa';
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
            <h2 className="py-4 text-center">Liste des Commandes</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-center border-b p-4">USER NAME</th>
                        <th className="text-center border-b p-4">ORDER DATE</th>
                        <th className="text-center border-b p-4">TOTAL AMOUNT</th>
                        <th className="text-center border-b p-4">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <OrderRow
                            key={order.id}
                            order={order}
                            onShowDetails={onShowDetails}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const OrderRow = ({ order, onShowDetails }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <tr>
            <td className="text-center border-b p-4">{order.userName}</td>
            <td className="text-center border-b p-4">{order.orderDate}</td>
            <td className="text-center border-b p-4">{order.totalAmount} ar</td>
            <td className="text-center border-b p-4 relative">
                <button
                    onClick={toggleMenu}
                    className="bg-transparent text-black py-1 px-2 rounded focus:outline-none"
                >
                    <FaEllipsisV />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                        <button
                            onClick={() => {
                                onShowDetails(order.id);
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                        >
                            <FaEye className="mr-1" /> Show
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default OrderList;
