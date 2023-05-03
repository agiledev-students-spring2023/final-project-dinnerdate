import './home-date.css';
import { useEffect, useState } from 'react';
import axios from '../axiosInstance';

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

    const handleDeleteDate = async () => {
        const req = {
            dateId: date?._id,
            posterId: date?.poster._id,
            requesterId: date?.requester._id,
        }
        await axios.post(`/delete-date`, req)
          .then(window.location.reload());
        
    }

    return (
        <div className="home">
            <h1> Congratulations, you have a date! </h1>
            <h3>
              {restaurant?.name}
              {restaurant?.rating && " • " + restaurant?.rating + " ⭐"} 
              {restaurant?.price_level && " • " + '$'.repeat(restaurant?.price_level)}
            </h3>
            <p>{restaurant?.address}</p>
            <p>{restaurant?.phone_number && "📞" + restaurant?.phone_number}</p>
            <p>{restaurant?.description}</p>
            <p>Time: {new Date(date?.datetime).toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric',
            timeZoneName: 'short'
            })}</p>
            <p>Diner 1: {date?.poster.firstName + " " + date?.poster.lastName}</p>
            <p>Diner 2: {date?.requester.firstName + " " + date?.requester.lastName}</p>

            <div className="btn-container">
                <button onClick={handleDirections}>Get Directions</button>
                <button onClick={handleDeleteDate}>Resolve Date</button>
                <button onClick={handleDeleteDate}>Cancel Date</button>
            </div>
        </div>
    );
}

export default HomeDate;