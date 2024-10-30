import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../api/userApi';
import Navbar from '../Navbar';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaCalendarAlt, FaIdCard, FaUser } from 'react-icons/fa';

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
        <div className="m in-h-screen flex items-center  bg-cover bg-center" style={{ backgroundImage: "url('/path/to/background-image.jpg')" }}>
            <div className="w-full  bg-white bg-opacity-90 rounded-xl shadow-lg ">
            <Navbar />
                <div className="flex items-center p-6 bg-white rounded-t-xl">
                    <img
                        className="h-24 w-24 rounded-full border-4 border-white object-cover"
                        src={user.imageBase64 || '/img/placeholder.jpg'}
                        alt={`${user.firstName} ${user.lastName}`}
                    />
                   
                    <div className="ml-6">
                        <h1 className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</h1>
                        <p className="text-sm text-indigo-500 font-semibold">
                            {user.role || 'User Role'}
                        </p>
                    </div>
                </div>

                <div className="p-6 text-gray-700 bg-opacity-90">
                    
                    <div className="mb-6 p-4 border bg-opacity-90 overflow-hidden rounded-lg">
                        <h2 className="text-lg font-semibold text-indigo-600 mb-4">Coordonnées</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaEnvelope className="text-indigo-500" />
                                    <span className="font-semibold">Email</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaPhone className="text-indigo-500" />
                                    <span className="font-semibold">Téléphone</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.phoneNumber}</p>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaMapMarkerAlt className="text-indigo-500" />
                                    <span className="font-semibold">Adresse</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.address}</p>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaGlobe className="text-indigo-500" />
                                    <span className="font-semibold">Géolocalisation</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.geolocation || 'Non fourni'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-lg font-semibold text-indigo-600 mb-4">Détails personnels</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaCalendarAlt className="text-indigo-500" />
                                    <span className="font-semibold">Date de Naissance</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.dateOfBirth}</p>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaMapMarkerAlt className="text-indigo-500" />
                                    <span className="font-semibold">Lieu de Naissance</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.placeOfBirth}</p>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaIdCard className="text-indigo-500" />
                                    <span className="font-semibold">CIN</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.cinNumber}</p>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="flex items-center space-x-2">
                                    <FaUser className="text-indigo-500" />
                                    <span className="font-semibold">Statut</span>
                                </div>
                                <p className="text-sm text-gray-600">{user.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="mt-6 px-4 py-2 w-full text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                    Message
                </button>
            </div>
        </div>
    );
};

export default UserDetails;
