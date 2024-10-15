import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';

function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ROLE_CUSTOMER');
    const [mobile, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSignup = async () => {
        try {
            if (!fullName || !email || !password || !confirmPassword || !mobile) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await axios.post('http://localhost:8081/auth/signup', {
                fullName,
                email,
                password,
                role,
                mobile
            });
            console.log(response.data);
            history('/dashboard');
        } catch (error) {
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '600px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <MDBInput wrapperClass='mb-3' id='fullName' placeholder={"Full Name"} value={fullName} type='text' onChange={(e) => setFullName(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <MDBInput wrapperClass='mb-2' placeholder='Mobile Number' id='mobileNumber' value={mobile} type='text' onChange={(e) => setMobileNumber(e.target.value)} />
                    <label className="form-label mb-1">Role:</label>
                    <select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="ROLE_CUSTOMER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary" style={{ height: '40px', width: '100%' }} onClick={handleSignup}>Sign Up</button>
                    <div className="text-center">
                        <p>Already Registered? <a href="/">Login</a></p>
                    </div>
                </MDBContainer>
            </div>
        </div>
    );
}

export default SignupPage;
