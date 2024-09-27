import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/userApi';

const UserDetails = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(id); 
                setUser(userData); 
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return <p>Loading...</p>; 
    }

    return (
        <div>
            <h1>User Details</h1>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <p>Phone Number: {user.phoneNumber}</p>
        </div>
    );
};

export default UserDetails;
