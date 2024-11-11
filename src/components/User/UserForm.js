import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, user, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPassword('');
            setAddress(user.address || '');
            setPhoneNumber(user.phoneNumber || '');
            setImage(null);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('phoneNumber', phoneNumber);

        if (image) {
            formData.append('image', image);
        }

        onSubmit(formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="relative border rounded-lg p-8 bg-white w-full max-w-lg shadow-lg">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    &times;
                </button>
                
                <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
                    {user ? 'Update User' : 'Create User'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={!user}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required={!user}
                        className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer file:border-0 file:py-2 file:px-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white px-4 py-2 mt-4 rounded hover:bg-green-600 transition duration-200"
                    >
                        {user ? 'Update User' : 'Create User'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
