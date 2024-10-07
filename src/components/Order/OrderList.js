import React from 'react';

const OrderList = ({ orders, onShowDetails }) => {
    return (
        <div>
            <h2>Liste des Commandes</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}> 
                        <p> {order.userName} - {order.totalAmount} arriary</p>
                        <button onClick={() => onShowDetails(order.id)}>Show</button> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
