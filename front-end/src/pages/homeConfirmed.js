import './homeConfirmed.css';
import Button from '../components/Button.js'
import { Link } from "react-router-dom";

const HomeConfirmed = () => {
    return (
        <div className="homeConfirmed">
            <h1>Date with [DINER NAME]</h1>
            <h3>You have a date with [Diner Name] at [Restaurant Name] on MM/DD/YYYY at HH:MM. Don’t be late!</h3>

            <div className='options'><Link to="/conversation" style={{ textDecoration: 'none' }}><Button text="Chat with [DINER NAME]"/></Link></div>
            <div className='options'><Button text="Get Directions"/></div> 
            <div className='options'><Link to="/edit-post" style={{ textDecoration: 'none' }}><Button text="Edit Date"/></Link></div>
            <div className='options'><Link to="/home" style={{ textDecoration: 'none' }}><Button text="Cancel Date"/></Link></div>
        </div>
    );
}

export default HomeConfirmed;