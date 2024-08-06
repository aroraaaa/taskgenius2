import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupLogin.css';

const SignupLogin = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);  // Add loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true when form is submitted

        try {
            const endpoint = isSignup ? '/auth/signup' : '/auth/login';
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/ai');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred');
        } finally {
            setLoading(false);  // Set loading to false after request is complete
        }
    };

    return (
        <div className='container'>
            {loading && (
                <div className='loading-overlay'>
                    <div className='spinner'></div>
                </div>
            )}
            <h2>You need to login first!</h2>
            <div className='box'>
                <h1>{isSignup ? 'Signup' : 'Login'}</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className='first-button'>{isSignup ? 'Signup' : 'Login'}</button>
                </form>
                {error && <p>{error}</p>}
                <div className='end'>
                    <div className="question">
                        {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
                    </div>
                    <div 
                        className="toggle" 
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? 'Login' : 'Signup'}
                    </div>
                </div>
                <button className='sec-button' onClick={() =>{navigate('/')}}>Go back</button>
            </div>
        </div>
    );
};

export default SignupLogin;
