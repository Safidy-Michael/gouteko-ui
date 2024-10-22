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
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src={user.imageBase64 || '/img/placeholder.jpg'}
                        alt={`${user.firstName} ${user.lastName}`}
                    />
                </div>

                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {user.role || 'User Role'} 
                    </div>
                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Here are the details of the user.
                    </p>
                    
                    <div className="mt-4 text-sm text-gray-500">
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                        <p>Phone Number: {user.phoneNumber}</p>
                    </div>

                    <button className="mt-4 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
