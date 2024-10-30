import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';

function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [placeOfBirth, setPlaceOfBirth] = useState('');
    const [cin, setCin] = useState('');
    const [status, setStatus] = useState('');
    const [geolocation, setGeolocation] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSignup = async () => {
        try {
            // Vérification des champs requis
            if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber || !dateOfBirth || !placeOfBirth || !cin || !status || !geolocation || !image) {
                setError('Please fill in all fields.');
                return;
            }

            // Vérification des mots de passe
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            // Création de FormData pour inclure l'image et les autres champs
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('address', address);
            formData.append('phoneNumber', phoneNumber);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('placeOfBirth', placeOfBirth);
            formData.append('cin', cin);
            formData.append('status', status);
            formData.append('geolocation', geolocation);
            formData.append('image', image);

            const response = await axios.post('http://localhost:8080/auth/signup', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response.data);

            history('/dashboard');
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : 'An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '600px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <MDBInput wrapperClass='mb-3' id='firstName' placeholder="First Name" value={firstName} type='text' onChange={(e) => setFirstName(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' id='lastName' placeholder="Last Name" value={lastName} type='text' onChange={(e) => setLastName(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Address' id='address' value={address} type='text' onChange={(e) => setAddress(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Phone Number' id='phoneNumber' value={phoneNumber} type='text' onChange={(e) => setPhoneNumber(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Date of Birth' id='dateOfBirth' value={dateOfBirth} type='date' onChange={(e) => setDateOfBirth(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Place of Birth' id='placeOfBirth' value={placeOfBirth} type='text' onChange={(e) => setPlaceOfBirth(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='CIN' id='cin' value={cin} type='text' onChange={(e) => setCin(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Status' id='status' value={status} type='text' onChange={(e) => setStatus(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Geolocation' id='geolocation' value={geolocation} type='text' onChange={(e) => setGeolocation(e.target.value)} />
                    
                    <MDBInput wrapperClass='mb-3' placeholder='Image' id='image' type='file' onChange={handleImageChange} />
                    
                    <button className="mb-4 d-block mx-auto btn btn-primary" style={{ height: '40px', width: '100%' }} onClick={handleSignup}>Sign Up</button>
                    <div className="text-center">
                        <p>Already Registered? <a href="/">Login</a></p>
                    </div>
                </MDBContainer>
            </div>
        </div>
    );
}

export default SignupPage;
