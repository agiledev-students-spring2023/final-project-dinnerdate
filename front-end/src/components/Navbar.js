const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>DinnerDate</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/messages">Messages</a>
                <a href="/profile">My Profile</a>
            </div>
        </nav>
    );
}

export default Navbar;