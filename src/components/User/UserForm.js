import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, user }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPassword('');
            setAddress(user.address || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ firstName, lastName, email, password, address, phoneNumber });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setPhoneNumber('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 mr-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!user} 
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 mr-2"
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                {user ? 'Update User' : 'Create User'}
            </button>
        </form>
    );
};

export default UserForm;
