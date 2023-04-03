import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>DinnerDate</h1>
            <div className="links">
                <Link to='/home'>Home</Link>
                <Link to='/inbox'>Inbox</Link>
                <Link to='/user/:userId'>My Profile</Link>
            </div>
        </nav>
    );
}

export default Navbar;