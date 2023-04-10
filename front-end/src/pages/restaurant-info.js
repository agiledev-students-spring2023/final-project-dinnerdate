import './restaurant-info.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Popup from "../components/Popup.js";

// import Popup from 'reactjs-popup';

const sampleRestaurantData = {
    "name": '',
    "address": '',
    "rating": '',
    "description": '',
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
    const [visibility, setVisibility] = useState(false);
 
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

    const [restaurantData, setRestaurantData] = useState(sampleRestaurantData);
    const [diners, setDiners] = useState([...sampleDinerData]);
    const [selectedDiner, setSelectedDiner] = useState([-1]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const { placeId } = useParams();

    const fetchRestaurantInfo = () => {
        Axios.get(`http://localhost:3000/restaurant/${placeId}`)
            .then((res) => {
                setRestaurantData({
                    "name":res.data["name"],
                    "address":res.data["address"],
                    "description":res.data["description"],
                    "num_ratings": res.data['num_ratings'],
                    "phone_number": res.data['phone_number'],
                    "rating":res.data["rating"],
                    "url":res.data["url"]
                })
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
                    dinerPosts.push(dinerPost);
                })
                .catch(err => console.log("Error: " + err ? err : "Unexpected error occurred."));
        }
        if(dinerPosts.length != 0) {
            setDiners(dinerPosts);
        }
    };

    const DinerPost = ( props ) => {
        return (
                <div onClick={() => setButtonPopup(true)} className="post diner-post">
                    <img className="avatar" src={props.avatar_url}></img> 
                    <div className="diner-info"> 
                        <h2>{props.title}</h2>
                        <h5>{props.datetime}</h5>
                        <h3>{props.full_name} {props.rating}⭐ ({props.num_ratings} reviews)</h3>
                    </div>
                </div>
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
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <div className="otherUserProfile">
                            <h1>[Diner Name], [Age]</h1>
                            <div id="wrapper">
                                <div id="first"><img style={{ width: "200px", height: "200px", borderRadius: "80px", paddingBottom: "30px" }}
                                        src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt="" /></div>
                                <div id="second">The User bio will appear here...</div>
                            </div>
                            <div className="dec-btn"><div onClick={() => setButtonPopup(false)}><button>Decline</button></div></div>
                            <div className="acc-btn"><Link to="/date"><button>Accept</button></Link></div>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    );
}

const CreatePost = () => {
    return (
        <Link to='/create-post' className='post create-post'>
            <h2>Create a new post...</h2>
        </Link>
    )
}

export default RestaurantInfo;