import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getUsers, createUser, updateUser, deleteUser } from '../../api/userApi';
import UserForm from './UserForm';
import UserList from './UserList';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateOrUpdateUser = async (user) => {
        try {
            if (editingUser) {
                await updateUser(editingUser.id, user);
                setEditingUser(null);
            } else {
                await createUser(user);
            }
            fetchUsers(); 
        } catch (error) {
            console.error('Error creating/updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers(); 
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user); 
    };

    const handleShowUser = (userId) => {
        navigate(`/users/${userId}`); 
    };

    return (
        <div>
            <h2 className="text-xl mb-4">User Management</h2>
            <UserForm onSubmit={handleCreateOrUpdateUser} user={editingUser} />
            <UserList 
                users={users} 
                onEdit={handleEditUser} 
                onDelete={handleDeleteUser} 
                onShow={handleShowUser} 
            />
        </div>
    );
};

export default UserManagement;
