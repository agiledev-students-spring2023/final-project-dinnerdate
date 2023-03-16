import { Link } from "react-router-dom";
import { useState } from 'react'
import './locationInfo.css';
import Button from '../components/Button.js'
import DinerPost from '../components/DinerPost.js'
import DinerPosts from '../components/DinerPosts.js'

const sampleRestaurantData = {
    "name": 'Restaurant Name',
    "address": '5 University Pl, New York, NY 10003',
    "rating": '4.2',
    "description": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  };
  
const sampleDinerData = [
    {
    "id": 0,
    "title": "Looking for a Valentines",
    "date": "MM/DD/YY",
    "time": "HH:MM PM",
    "author": "Johnny Appleseed",
    "rating": "4.8",
    "num_ratings": "23"
    },
    {
    "id": 1,
    "title": "hi there!",
    "date": "MM/DD/YY",
    "time": "HH:MM PM",
    "author": "Johnny Peachseed",
    "rating": "4.5",
    "num_ratings": "7"
    }];

const LocationInfo = () => {
    const [restaurantData, setRestaurantData] = useState(sampleRestaurantData);
    const [diners, setDiners] = useState([...sampleDinerData]);
    const [selectedDiner, setSelectedDiner] = useState([-1]);
    return (
        <div className="location-info">
            <h1>{restaurantData.name}</h1>
            <h3>{restaurantData.address} • {restaurantData.rating}⭐</h3>

            <p className='description'>{restaurantData.description}</p>

            <h2>Select a diner below (or create your own post)!</h2>

            <CreatePost />

            {diners.length > 0 ? <DinerPosts diners={diners} 
                                             onClick={(id) => setSelectedDiner(id)} 
                                             selectedDiner={selectedDiner}/>
                               : <p>There are currently no diners for this restaurant.</p>}

            <div className="left-btn"><Button text="Back"/></div>
            <div className="right-btn">{selectedDiner != -1 ? <Button text="Select" link="/home"/> : <p></p>}</div>
            {/* Select onClick should link to appropriate page */}
        </div>
    );
}

const CreatePost = () => {
    return (
        <div className='createPost'>
            <Link to='/create-post'>Create a new post...</Link>
        </div>
    )
}

export default LocationInfo;