import './home.css';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <h1>Find / Create a Date</h1>
            <Link to="/location-info">Sample Restaurant</Link>
        </div>
    );
}

export default Home;