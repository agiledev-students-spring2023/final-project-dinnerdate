import { useHistory, Link } from "react-router-dom";
import axios from '../axiosInstance';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './login.css';

const Register = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthday: '',
        gender: '',
        password: '',
        passwordCheck: ''
      });

      function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }
      function handleBirthdayChange(birthday) {
        handleChange({ target: { name: 'birthday', value: birthday }});
      }

      async function handleSubmit(event) {
        const formDataCopy = {...formData};
        formDataCopy.birthday = new Date(formDataCopy.birthday).toLocaleDateString();
        event.preventDefault();
        await axios.post(`/register`, formDataCopy, {params: {}})
            .then((response) => {
                // Store token and user data in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Redirect to home page
                history.push('/'); 
                window.location.reload();
            })
            .catch(e => console.error(e));
      }

    return (
        <div className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <form>
                <div className="name">
                    <label> First Name
                        <input type="text" name="firstName"  value={formData.firstName} onChange={handleChange} required/>
                    </label>
                    <label> Last Name
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required/>
                    </label>
                </div>

                <label> Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                </label>

                <label> Birthday
                    <DatePicker 
                        disableFuture
                        value={formData.birthday}
                        onChange={handleBirthdayChange}
                    />
                </label>

                <label> Gender
                    <select type="text" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="" disabled> </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                        <option value="unknown">Prefer not to say</option>
                    </select>
                </label>

                <label> Password
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                </label>

                <label> Re-enter Password
                    <input type="password" name="passwordCheck" value={formData.passwordCheck} onChange={handleChange} required/>
                </label>
                <div className="register-container">
                    <div className="link"><Link className="link" to='/login'>Already have an account? Login here!</Link></div>
                    <div className="register-btn"><button>Register</button></div>
                </div>
            </form>
        </div>
    );
}

export default Register;