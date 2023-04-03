import { Link } from "react-router-dom";
import './home-lfd.css';
import Button from '../components/Button.js'
import { useState } from 'react'
import DinerRequest from '../components/DinerRequest';
import DinerRequests from '../components/DinerRequests';

const sampleDinerData = [
    {
    "id": 0,
    "message": "an apple a day... read more",
    "author": "Johnny Appleseed",
    "rating": "4.8",
    "num_ratings": "14"
    },
    {
    "id": 1,
    "message": "hi there!",
    "author": "Johnny Peachseed",
    "rating": "4.5",
    "num_rating": "7"
    },
    {
    "id": 2,
    "message": "would really like to go on this date!",
    "author": "Johnny Noseed",
    "rating": "1.1",
    "num_rating": "44"
    }];


const HomeLFD = () => {
    const [diners, setDiners] = useState([...sampleDinerData])
    const [selectedDiner, setSelectedDiner] = useState([-1]);
    return (
        <div className="homeLFD">
            <h1>Your Post</h1>

            <h2>{diners.length} people would like to go on the date with you!  Select the lucky diner who would be joining you!</h2>

            {diners.length > 0 ? <DinerRequests diners={diners} 
                                                onClick={(id) => setSelectedDiner(id)} 
                                                selectedDiner={selectedDiner}/>: 
                                <p>There's currently no one available, tough love :c</p>}
            <div className="directions"><Button text="Get Directions"/></div>
            <div className="edit-post"><Link to="edit-post"><Button text="Edit Post"/></Link></div>
            <div className="remove-post"><Link to="/"><Button text="Remove Post"/></Link></div>
        </div>
    );
}

export default HomeLFD;