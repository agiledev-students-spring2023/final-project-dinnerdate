import { Link } from "react-router-dom";
import './home-lfd.css';
import { useState } from 'react'
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
            <Link className="get-directions" to="/">Get Directions</Link>
            <Link className="edit-post" to="edit-post"><button>Edit Post</button></Link>
            <Link className="remove-post" to="/"><button>Remove Post</button></Link>
        </div>
    );
}

export default HomeLFD;