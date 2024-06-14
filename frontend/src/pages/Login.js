import React, { useEffect, useState } from "react";
import "../styles/Login.css"

const LoginForm = () => {

    useEffect(() => {
        // You can put any initialization logic here
    }, []) // Empty dependency array means this effect runs only once after the component mounts

    const [isRegistering, setIsRegistering] = useState(false);

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    const handleLogin = () => {
        // You can put your login logic here
        // For demonstration purposes, let's just show a login success message
        alert("Login successful!");
    };

    const handleRegister = () => {
        // You can put your register logic here
        // For demonstration purposes, let's just show a register success message
        alert("Register successful!");
    };

    return (
        <div className="cover">
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" />
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

export default LoginForm;
