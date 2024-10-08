import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, user }) => {
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
        <form onSubmit={handleSubmit} className="float-right">
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="border p-2 mr-2"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="border p-2 mr-2"
                />
            </div>
            <div className="mb-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 mr-2"
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!user} 
                    className="border p-2 mr-2"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border p-2 mr-2"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border p-2 mr-2"
                />
            </div>
            <div className="mb-3">
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required={!user}
                />
            </div>
            <button type="submit" className="btn btn-primary bg-green-500 text-B px-4 py-2 mt-4 rounded">
                {user ? 'Update User' : 'Create User'}
            </button>
        </form>
    );
};

export default UserForm;
