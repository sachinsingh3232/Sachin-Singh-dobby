import React, { useContext, useState } from 'react'
import '../Register/register.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const submitHandler = async (e) => {
        setError(null)
        e.preventDefault();
        alert('Checking credentials')
        const inputs = {
            email,
            password
        }
        try {
            await login(inputs);
        } catch (e) {
            setError(e.response.data)
        }
    }
    return (
        <div className='register'>
            <div className='container'>
                <form onSubmit={submitHandler}>
                    <div className='heading'>
                        <span>Login</span>
                        <div className='text'>Please Enter your details to login.</div>
                    </div>
                    <input className='input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                    <input className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                    <button type='submit'>Login</button>
                    {error && <p className='error'>{error} !</p>}
                    <div>Already have an account ? <Link className='link' to={'/register'}>Sign Up</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Login