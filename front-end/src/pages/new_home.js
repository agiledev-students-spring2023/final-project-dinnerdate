import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from '../axiosInstance';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import Popup from "../components/Popup.js";
import './new_home.css';

const libraries = ["places"];
function Home() {
  const [selected, setSelected] = useState(); // selected location { placeId, lat, lng }
  const [isRestaurant, setIsRestaurant] = useState(false); // if the selected location is a restaurant

  // Show "Loading..." if google maps API is not ready
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: libraries });
  if (!isLoaded) return <>Loading...</>;

  return (
    <div className="home">
          <h1>Find / Create a Date</h1>
          <PlacesAutocomplete setSelected={setSelected} />
          <Map selected={selected} setSelected={setSelected} />
          <RestaurantInfo selected={selected} setIsRestaurant={setIsRestaurant} />
          {isRestaurant && <Posts selected={selected} />}
    </div>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = ({ description }) => () => {
      setValue(description, false);
      clearSuggestions();
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ placeId: results[0].place_id, lat: lat, lng: lng }); 
      });
    };

  const ref = useOnclickOutside(() => { clearSuggestions(); });

  const handleInput = (e) => { setValue(e.target.value); }; // Update the keyword of the input element

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className="places-autocomplete" ref={ref}>
      <input value={value} onChange={handleInput} disabled={!ready} placeholder="Search for a restaurant"/>
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
const Map = ({ selected, setSelected }) => { 
  const [currPosition, setCurrPosition] = useState(); // user's position
  useEffect(() => { // get current position once
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => { setCurrPosition({ lat: position.coords.latitude, lng: position.coords.longitude }); },
          error => { console.error(error);}
        );
      }
    }, []);
  // when a location is selected, set it as current position
  useEffect(() => { if (selected) setCurrPosition( {lat: selected.lat, lng: selected.lng} ) }, [selected])

  // when place is clicked, select it
  const onClick = (e) => { if (e.placeId) setSelected({ placeId:e.placeId , lat: e.latLng.lat(), lng: e.latLng.lng() }) }
  
  return (
    <GoogleMap className="map"
    zoom={15} 
    center={currPosition} 
    mapContainerStyle={ { width: "600px", height: "400px" } }
    onClick={onClick}
    >
      {selected && <Marker position={ {lat: selected.lat, lng: selected.lng} } />}
    </GoogleMap>
  );
}
const RestaurantInfo = ({ selected, setIsRestaurant }) => {
  const [restaurantData, setRestaurantData] = useState(null);
  useEffect(() => {
    if (!selected) return
    axios.get(`/restaurant/${selected.placeId}`)
      .then(res => setRestaurantData(res.data))
      .catch(err => console.log(err ? err : "Unexpected error occurred."));
  }, [selected])

  if(!restaurantData){
    setIsRestaurant(false);
    if(selected) return (<>This place is not a restaurant. Please select another location.</>)
    else return (<>Select a restaurant on the map.</>)
  }
  else{
    setIsRestaurant(true);
  }
  return (
    <div className="restaurant-info">
            <h2>
              {restaurantData.name} 
              {restaurantData.rating && " • " + restaurantData.rating + " ⭐"} 
              {restaurantData.price_level && " • " + '$'.repeat(restaurantData.price_level)}
            </h2>
            <p>{restaurantData.phone_number && "📞" + restaurantData.phone_number}</p>
            <p>{restaurantData.description}</p>
    </div>
  )

}
const Posts = ({ selected }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(-1);
  const [buttonPopup, setButtonPopup] = useState();

  useEffect(() => {
    if (!selected) return
    axios.get(`/restaurant/${selected.placeId}/posts`)
      .then(res => setPosts(res.data.map(e => ({key: e._id, ...e}))))
      .catch(err => console.log(err ? err : "Unexpected error occurred."));
  }, [selected])

  useEffect(() => {
    if(selectedPost == -1) return;
  }, [selectedPost])

  if(!selected) return (<></>)

  const handleRequest = async (post) => {
    console.log("Attempted to create request!");
    const request = {
      posterId: post.author._id,
      requesterId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null,
      postId: post._id,
      status: "pending"
    }
    console.log(request);
    await axios.post(`/create-request`, request)
        .then((response) => console.log(response))
        .catch(e => console.error(e.response.data.msg));
  }
  return (
    <div className="posts">
      {posts.length ? "" : "There are no posts for this restaurant."}
        <Link to={`/create-post/${selected.placeId}`} className='post create-post'>
            <h2>Create a new post...</h2>
        </Link>

        {posts.map((post, index) => (
          <div className="post diner-post" key={index} onClick={() => {setButtonPopup(true); setSelectedPost(index);}} >
            <h2 className="truncate">{post.title}</h2>
            <h5>{new Date(post.datetime).toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric',
            timeZoneName: 'short'
            })}</h5>
            <h3>{post.author.firstName} {post.author.lastName}</h3>
          </div>
        ))}

      {posts && selectedPost != -1 && 
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="otherUserProfile">
          <h1>{posts[selectedPost].title}</h1>
          <h3>{posts[selectedPost].author.firstName} {posts[selectedPost].author.lastName}</h3>
          <h4>{new Date(posts[selectedPost].datetime).toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric',
            timeZoneName: 'short'
            })}
          </h4>
          <div id="wrapper">
            <div id="first">
              <img
                style={{ width: "200px", height: "200px", borderRadius: "20px"}}
                src={'https://picsum.photos/300/300'} /* Should be profile picture */
              />
            </div>
            <div id="second">{posts[selectedPost].description}</div>
          </div>
          <div className="acc-btn">
            <div onClick={() => { setSelectedPost(-1); setButtonPopup(false);}}>
              <button onClick={() => handleRequest(posts[selectedPost])}>Request</button> {/* Should add a request to the logged-in user's data. */}
              <button className="close-btn">close</button>
            </div>
          </div>
        </div>
      </Popup>}
    </div>
  )
}

export default Home;