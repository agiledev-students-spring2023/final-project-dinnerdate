import './home-date.css';
import { useEffect, useState } from 'react'
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';


function HomeDate() {
    const [date, setDate] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const userId = (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');
    useEffect(() => { // get date from user
      axios.get(`/user/${userId}`)
      .then(res => {
        if (res.data.dinnerDate) {
          setDate(res.data.dinnerDate)
        }
      })
      .catch(e => console.error(e));
    }, [])

    useEffect(() => { // get restaurant data from date
        if (!date) return;
        axios.get(`/restaurant/${date.placeId}`)
        .then(res => {
          setRestaurant(res.data);
        })
      }, [date])

    const handleDirections = () => {
        const mapsLink = `https://www.google.com/maps/place/?q=place_id:${date?.placeId}`;
        window.open(mapsLink, '_blank');
    }

    return (
        <div className="home">
            <h1> Congratulations, you have a date! </h1>
            <h3>
              {restaurant?.name}
              {restaurant?.rating && " • " + restaurant?.rating + " ⭐"} 
              {restaurant?.price_level && " • " + '$'.repeat(restaurant?.price_level)}
            </h3>
            <p>{date?.placeId}</p>
            <p>{restaurant?.address}</p>
            <p>{restaurant?.phone_number && "📞" + restaurant?.phone_number}</p>
            <p>{restaurant?.description}</p>
            <p>Diner 1: {date?.poster.firstName + " " + date?.poster.lastName}</p>
            <p>Diner 2: {date?.requester.firstName + " " + date?.requester.lastName}</p>

            <div className="btn-container">
                <button>Chat</button>
                <button onClick={handleDirections}>Get Directions</button>
                <button>Resolve Date</button>
                <button>Cancel Date</button>
            </div>
        </div>
    );
}

export default HomeDate;