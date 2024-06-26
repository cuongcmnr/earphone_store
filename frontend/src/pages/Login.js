import React, { useEffect, useState }  from "react";
import "../styles/Login.css"
import { useCookies } from 'react-cookie';

const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['session']);

    useEffect(() => {
        const session = cookies.session;
        if (session) {
        setIsLoggedIn(true);
        fetch('http://127.0.0.1:5002/api/admin/views/Login', { 
            method: 'POST',
          })
            .catch(error => console.error('Error updating views:', error));
        const fetchUserData = async () => {
            const response = await fetch('http://127.0.0.1:5002/api/user/whoami', {
                headers: {
                    'Cookie': session
                }
            });
            if (response.status === 200) {
                const user = await response.json();
                setUser(user);
            }
        };
        fetchUserData();
    }
    }, []) 
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ user, setUser ] = useState('');
    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    const handleLogin = async () => {
        const response = await fetch('http://127.0.0.1:5002/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        });

        if (response.status === 200) {
            alert("Login successful!");
            const data = await response.json();
            setCookie('session', data.session);
            setUser(data.user);
        } else {
            alert("Login failed!");
        }
    };

    const handleRegister = async () => {
        const response = await fetch('http://127.0.0.1:5002/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: password
            })
        });

        if (response.status === 200) {
            alert("Register successful!");
        } else {
            alert("Register failed!");
        }
    };
    const handleLogout = async () => {
        const response = await fetch('http://127.0.0.1:5002/api/user/logout', {
            method: 'POST',
            headers: {
                'Session': cookies.session
            }
        });
    
        if (response.status === 200) {
            alert("Logout successful!");
            removeCookie('session');
            setIsLoggedIn(false);
            setUser(null);
        } else {
            alert("Logout failed!");
        }
    };
    if (isLoggedIn) {
        return (
            <div>
                <h1>Welcome back!</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }
    return (
        <div className="cover">
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            {isRegistering && (
                <div className="input-box">
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
            )}

            <div className="input-box">
                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {isRegistering ? (
                <div className="login-btn" onClick={handleRegister}>Register</div>
            ) : (
                <div className="login-btn" onClick={handleLogin}>Login</div>
            )}

            <div className="toggle-btn" onClick={toggleRegister}>
                {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register here'}
            </div>
            
        </div>
    )
}

export default Login;
