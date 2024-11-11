import React, { useState } from 'react';
import { FaEllipsisV, FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const UserList = ({ users, onEdit, onDelete, onShow }) => {
    return (
        <table className="min-w-full border-collapse">
            <thead>
                <tr>
                    <th className="text-center border-b p-4">USER NAME</th>
                    <th className="text-center border-b p-4">EMAIL</th>
                    <th className="text-center border-b p-4">ROLE</th>
                    <th className="text-center border-b p-4">IMAGE</th>
                    <th className="text-center border-b p-4">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <UserRow 
                        key={user.id} 
                        user={user} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                        onShow={onShow} 
                    />
                ))}
            </tbody>
        </table>
    );
};

const UserRow = ({ user, onEdit, onDelete, onShow }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <tr>
            <td className="text-center border-b p-4">{user.firstName} {user.lastName}</td>
            <td className="text-center border-b p-4">{user.email}</td>
            <td className="text-center border-b p-4">{user.role}</td>
            <td className="text-center border-b p-4">
                <img
                    alt={`${user.firstName} ${user.lastName}`}
                    src={user.imageBase64 || 'https://via.placeholder.com/150'}
                    className="inline-block h-12 w-12 rounded-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                />
            </td>
            <td className="text-center border-b p-4 relative">
                <button
                    onClick={toggleMenu}
                    className="bg-w text-black py-1 px-2 rounded focus:outline-none"
                >
                    <FaEllipsisV />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                        <button
                            onClick={() => {
                                onEdit(user);
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                        >
                            <FaEdit className="mr-1" /> Edit
                        </button>
                        <button
                            onClick={() => {
                                if (user.id) {
                                    onShow(user.id); 
                                    setIsMenuOpen(false);
                                } else {
                                    console.error("User ID is null or undefined");
                                }
                            }}
                            className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                        >
                            <FaEye className="mr-1" /> Show
                        </button>
                        <button
                            onClick={() => {
                                onDelete(user.id);
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center p-2 hover:bg-gray-200 w-full text-left"
                        >
                            <FaTrash className="mr-1" /> Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default UserList;
