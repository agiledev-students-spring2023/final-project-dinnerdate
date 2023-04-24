import './navbar.css';
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to='/'><h1>DinnerDate</h1></Link>
            <div className="links">
                <Link to='/inbox'>Inbox</Link>
                <Link to='/profile'>Profile</Link>
                {/* <Link to='/profile'>My Profile</Link> */}
            </div>
        </nav>
    );
}

export default Navbar;