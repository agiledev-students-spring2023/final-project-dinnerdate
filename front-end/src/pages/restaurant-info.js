import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import './restaurant-info.css';
import Button from '../components/Button.js'
import DinerPosts from '../components/DinerPosts.js'

// only used in case mockaroo API does not work
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
    "datetime": "MM/DD/YY HH:MM PM",
    "full_name": "Johnny Appleseed",
    "rating": "4.8",
    "num_ratings": "23"
    },
    {
    "id": 1,
    "title": "hi there!",
    "datetime": "MM/DD/YY HH:MM PM",
    "full_name": "Johnny Peachseed",
    "rating": "4.5",
    "num_ratings": "7"
    }];

const RestaurantInfo = ( props ) => {
    const [restaurantData, setRestaurantData] = useState(sampleRestaurantData);
    const [diners, setDiners] = useState([...sampleDinerData]);
    const [selectedDiner, setSelectedDiner] = useState([-1]);

    const { restaurantId } = useParams();

    const fetchRestaurantInfo = () => {
        Axios.get(`http://localhost:3000/restaurant/${restaurantId}`)
            .then((res) => {
                const restaurant = res.data;
                setRestaurantData({
                    "id": restaurant["id"],
                    "name": restaurant["name"],
                    "address": restaurant["address"],
                    "rating": restaurant["rating"],
                    "description": restaurant["description"]
                });
            })
            .catch(err => console.log("Error: " + err ? err : "Unexpected error occurred."));
    };

    const fetchDinerPosts = () => {
        const randInt = Math.floor(Math.random() * (4) + 1);
        const dinerPosts = [];
        for(let i = 0; i < randInt; i++){
            // slug should be id of diner post in the future
            Axios.get(`http://localhost:3000/diner-post/${randInt}`)
                .then((res) => {
                    const post = res.data;
                    const dinerPost = ({
                        "id": post["id"],
                        "title": post["title"],
                        "datetime": post["datetime"],
                        "full_name": post["full_name"],
                        "description": post["description"],
                        "rating": post["rating"],
                        "num_ratings": post["num_ratings"]
                    })
                    dinerPosts.append(dinerPost);
                })
                .catch(err => console.log("Error: " + err ? err : "Unexpected error occurred."));
        }
        if(dinerPosts.length != 0) {
            setDiners(dinerPosts);
        }
    };

    useEffect(() => {
        fetchRestaurantInfo();
        fetchDinerPosts();
    }, [])
    
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
            <div className="right-btn">{selectedDiner != -1 ? <Link to="/user:userId"><Button text="Select" /></Link> : <p></p>}</div>
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

export default RestaurantInfo;