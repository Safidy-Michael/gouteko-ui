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
                console.log('User data:', userData); 
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
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            <h1>User Details</h1>
            {user.imageBase64 ? (
               <img
               src={user.imageBase64}
               alt="User"
               className="w-32 h-32 rounded-full"
           />
           
            ) : (
                <p>No image available</p>
            )}
            <div>
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
                <p>Phone Number: {user.phoneNumber}</p> 
            </div>
        </div>
    );
};

export default UserDetails;
