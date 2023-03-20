import './homeConfirmed.css';
import Button from '../components/Button.js'

const HomeConfirmed = () => {
    return (
        <div className="homeConfirmed">
            <h1>Date with [DINER NAME]</h1>
            <h3>You have a date with [Diner Name] at [Restaurant Name] on MM/DD/YYYY at HH:MM. Don’t be late!</h3>

            <div className='options'><Button text="Chat with [DINER NAME]"/></div>
            <div className='options'><Button text="Get Directions"/></div>
            <div className='options'><Button text="Edit Date"/></div>
            <div className='options'><Button text="Cancel Date"/></div>
        </div>
    );
}

export default HomeConfirmed;