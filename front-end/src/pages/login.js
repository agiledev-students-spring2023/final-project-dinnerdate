import { useHistory, Link } from "react-router-dom";
import axios from '../axiosInstance';
import React, { useState } from 'react';
import './login.css'

const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;


const Login = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

      function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }

      async function handleSubmit(event) {
        event.preventDefault();
        await axios.post(`/login`, formData, {params: {}})
            .then((response) => {
                // Store token and user data in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Redirect to home page
                history.push('/'); 
                window.location.reload();
            })
            .catch(e => console.error(e.response.data.msg));
      }

    return (
        <div className="login" onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <form>
                <label> Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                </label>

                <label> Password
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                </label>

                <div className="login-container">
                    <div className="link"><Link className="link" to='/register'>Don't have an account? Register here!</Link></div>
                    <div className="login-btn"><button>Login</button></div>
                </div>
            </form>
        </div>
    );
}

export default Login;