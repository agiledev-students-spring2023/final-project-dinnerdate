import './navbar.css';
import { Link } from "react-router-dom";
const Navbar = ({ isLoggedIn, handleLogout}) => {
    return (
        <nav className="navbar">
            <Link to='/'><h1>DinnerDate</h1></Link>
            <div className="links">
                <Link to='/inbox'>Inbox</Link>
                <Link to='/login'>Login</Link>
                {isLoggedIn && (
                    <>
                        <Link to='/profile'>Profile</Link>
                        <button onClick = {handleLogout}>Logout</button>
                            </>
                )}
               </div>
        </nav>
    );
}

export default Navbar;