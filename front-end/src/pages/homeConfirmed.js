import './homeConfirmed.css';
import { Link } from "react-router-dom";

const HomeConfirmed = () => {
    return (
        <div className="homeConfirmed">
            <h1>Date with [DINER NAME]</h1>
            <h3>You have a date with [Diner Name] at [Restaurant Name] on MM/DD/YYYY at HH:MM. Don’t be late!</h3>


            <Link className='options' to="/chat/:userId"><button>Chat with [DINER NAME]</button></Link>
            <Link className='options' to="/"><button>Get Directions</button></Link>
            <Link className='options' to="/"><button>Edit Date</button></Link>
            <Link className='options' to="/home"><button>Cancel Date</button></Link>
        </div>
    );
}

export default HomeConfirmed;