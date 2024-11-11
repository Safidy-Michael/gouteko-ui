import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../api/userApi';
import UserForm from './UserForm';
import UserList from './UserList';
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../Navbar';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            setUsers(usersData);
            setFilteredUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users. Please try again.');
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
            setShowForm(false);
            await fetchUsers();
        } catch (error) {
            console.error('Error creating/updating user:', error);
            alert('Failed to create/update user. Please try again.'); 
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete the user. Please try again.'); 
        }
    };

    const handleAddNewUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        setFilteredUsers(
            users.filter(user => 
                user.firstName.toLowerCase().includes(searchValue) ||
                user.lastName.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue)
            )
        );
    };

    const handleShow = (id) => {
        navigate(`/users/${id}`); 
    };

    return (
        <div className="p-4">

            <Navbar />
            
            <div className="flex justify-between items-center mb-4">
                <MDBInput
                    type="text"
                    placeholder="Search Users"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2"
                />
                <button 
                    onClick={handleAddNewUser}
                    className="w-25 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
                >
                   + Add User
                </button>
            </div>

            {showForm ? (
                <UserForm 
                    onSubmit={handleCreateOrUpdateUser} 
                    user={editingUser} 
                    onClose={() => setShowForm(false)} 
                />
            ) : (
                <UserList 
                    users={filteredUsers}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    onShow={handleShow} 
                />
            )}
        </div>
    );
};

export default UserManagement;
