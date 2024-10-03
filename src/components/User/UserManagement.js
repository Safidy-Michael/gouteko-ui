import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getUsers, createUser, updateUser, deleteUser } from '../../api/userApi';
import UserForm from './UserForm';
import UserList from './UserList';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [imageFile, setImageFile] = useState(null); // Assurez-vous que cette variable est déclarée
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

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]); // Met à jour imageFile avec le fichier téléchargé
    };

    const handleCreateOrUpdateUser = async (user) => {
        const formData = new FormData();
        formData.append("user", JSON.stringify(user));
        if (imageFile) {
            formData.append("image", imageFile);
        }
    
        try {
            if (editingUser) {
                await updateUser(editingUser.id, formData);
                setEditingUser(null);
            } else {
                await createUser(formData);
            }
            await fetchUsers(); 
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
            <input type="file" onChange={handleImageChange} />
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
