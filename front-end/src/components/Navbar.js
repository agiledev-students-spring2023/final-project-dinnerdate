import './navbar.css';
import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { Link } from "react-router-dom";
const Navbar = () => {
    const [user, setUser] = useState();
    const userId = (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');
    useEffect(() => {
        axios.get(`/user/${userId}`)
        .then(res => setUser(res.data))
        .catch(e => console.error(e.response.data.message));
      }, [])

    return (
        <nav className="navbar">
            <Link to='/'><h1>DinnerDate</h1></Link>
            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/inbox'>Inbox</Link>
                <Link to='/profile'>{user?.firstName + " " + user?.lastName}</Link>
            </div>
        </nav>
    );
}

export default Navbar;