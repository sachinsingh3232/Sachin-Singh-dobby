import React, { useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const Navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null)
        alert('Checking credentials')
        const inputs = {
            email: email,
            password: password
        }
        try {
            await axios.post(`${BASE_URL}/user/register`, inputs);
            Navigate('/login');
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data)
        }
    }
    return (
        <div className='register'>
            <div className='container'>
                <form onSubmit={submitHandler}>
                    <div className='heading'>
                        <span>Register</span>
                        <div className='text'>Please Enter your details to register.</div>
                    </div>
                    <input className='input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                    <input className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                    <button type='submit'>Register</button>
                    {error && <p className='error'>{error} !</p>}
                    <div>Already have an account ? <Link className='link' to={'/login'}>Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Register