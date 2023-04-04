import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import './restaurant-info.css';
import Button from '../components/Button.js'

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
    "num_ratings": "23",
    "avatar_url": "https://picsum.photos/50/50"
    },
    {
    "id": 1,
    "title": "hi there!",
    "datetime": "MM/DD/YY HH:MM PM",
    "full_name": "Johnny Peachseed",
    "rating": "4.5",
    "num_ratings": "7",
    "avatar_url": "https://picsum.photos/50/50"
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
                        "num_ratings": post["num_ratings"],
                        "avatar_url": "https://picsum.photos/50/50"
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
        <div className="restaurant-info">
            {/* Restaurant Information */}
            <div className="restaurant-information">
                <h1>{restaurantData.name}</h1>
                <h3>{restaurantData.address} • {restaurantData.rating}⭐</h3>
                <p className='description'>{restaurantData.description}</p>
            </div>

            {/* Diner Posts */}
            <div className="diner-posts">
                {diners.length > 0 ? <h2>Select a diner below (or create your own post)!</h2>
                                   : <h2>There are no diners at this restaurant. Create your own post!</h2>}
                <div>
                    <CreatePost />
                    <DinerPosts diners = {diners}/>
                </div>
            </div>
        </div>
    );
}

const CreatePost = () => {
    return (
        <div className='post create-post'>
            <h2><Link to='/create-post'>Create a new post...</Link></h2>
        </div>
    )
}

const DinerPost = ( props ) => {
    return (
            <Link to="/" className="post diner-post">
                <img className="avatar" src={props.avatar_url}></img> 
                <div className="diner-info"> 
                    <h2>{props.title}</h2>
                    <h5>{props.datetime}</h5>
                    <h3>{props.full_name} {props.rating}⭐ ({props.num_ratings} reviews)</h3>
                </div>
            </Link>
    )
}

const DinerPosts = ( props ) => {
    return (
        <>
            {props.diners.map((dinerPost) => (
                <DinerPost 
                    key={dinerPost.id}
                    id={dinerPost.id}
                    title={dinerPost.title}
                    datetime={dinerPost.datetime}
                    full_name={dinerPost.full_name}
                    rating={dinerPost.rating}
                    num_ratings={dinerPost.num_ratings}
                    avatar_url={dinerPost.avatar_url}
                    isSelected={dinerPost.id === props.selectedDiner}
                />
            ))}
        </>
    )
}

export default RestaurantInfo;