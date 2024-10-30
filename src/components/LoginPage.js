import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please enter both email and password.');
                return;
            }
            
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });

            console.log('Login successful:', response.data);

            const { id, token, imageBase64 } = response.data; // Récupération de `imageBase64`

            localStorage.setItem('token', token); 
            localStorage.setItem('userId', id); 
            localStorage.setItem('profileImage', imageBase64); // Stockage de l'image en Base64

            navigate(`/users/${id}`); 
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Invalid email or password.'); 
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Login Page</h2>
                    <MDBInput 
                        wrapperClass='mb-4' 
                        placeholder='Email address' 
                        id='email' 
                        value={email} 
                        type='email' 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <MDBInput 
                        wrapperClass='mb-4' 
                        placeholder='Password' 
                        id='password' 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <button 
                        className="mb-4 d-block btn-primary" 
                        style={{ height: '50px', width: '100%' }} 
                        onClick={handleLogin}
                    >
                        Sign in
                    </button>
                    <div className="text-center">
                        <p>Not a member? <a href="/signup">Register</a></p>
                    </div>
                </MDBContainer>
            </div>
        </div>
    );
}

export default LoginPage;
