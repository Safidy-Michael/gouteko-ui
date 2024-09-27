import React from 'react';

const UserList = ({ users, onEdit, onDelete, onShow }) => {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id} className="mb-4">
                    {user.firstName} {user.lastName} - {user.email} 
                    <button
                        onClick={() => onEdit(user)}
                        className="ml-2 bg-yellow-500 text-white p-1">
                        Edit
                    </button>
                    <button
                        onClick={() => onShow(user.id)} 
                        className="ml-2 bg-blue-500 text-white p-1">
                        Show
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="ml-2 bg-red-500 text-white p-1">
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
