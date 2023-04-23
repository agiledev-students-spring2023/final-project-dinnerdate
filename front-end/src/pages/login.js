import { Link } from "react-router-dom";
import Axios from "axios";
import React, { useState } from 'react';
import './login.css'

const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;


const Login = () => {
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
        await Axios.post(`${serverUrl}:${serverPort}/login`, formData, {params: {}})
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

                <div className="link"><Link className="link" to='/register'>Don't have an account? Register here!</Link></div>
                <div className="login-btn"><button>Login</button></div>
            </form>
        </div>
    );
}

export default Login;