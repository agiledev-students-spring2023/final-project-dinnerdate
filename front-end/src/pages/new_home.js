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
  const [selected, setSelected] = useState(); // selected restaurant { placeId, lat, lng }

  // Show "Loading..." if google maps API is not ready
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: libraries });
  if (!isLoaded) return <>Loading...</>;

  return (
    <div className="home">
          <h1>Find / Create a Date</h1>
          <PlacesAutocomplete setSelected={setSelected} />
          <Map selected={selected} setSelected={setSelected} />
          <RestaurantInfo selected={selected} />
          <Posts selected={selected} />
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
const RestaurantInfo = ({ selected }) => {
  const [restaurantData, setRestaurantData] = useState(null);
  useEffect(() => {
    if (!selected) return
    axios.get(`/restaurant/${selected.placeId}`)
      .then(res => setRestaurantData(res.data))
      .catch(err => console.log(err ? err : "Unexpected error occurred."));
  }, [selected])

  return (
    <>
      {restaurantData ? (
          <div className="restaurant-info">
            <h2>{restaurantData.name} • {restaurantData.rating}⭐ • {'$'.repeat(restaurantData.price_level)}</h2>
            <p>📞 {restaurantData.phone_number}</p>
            <p>{restaurantData.description}</p>
          </div>) : null}
    </>
  )

}
const Posts = ({ selected }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);
  
  useEffect(() => {
    if (!selected) return
    axios.get(`/restaurant/${selected.placeId}/posts`)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err ? err : "Unexpected error occurred."));
  })

  return (
    <>
      {posts.length ? (
        <div className="posts">
          <>Posts exist</>
        </div>) : "There are no posts for this restaurant."}

        <Link to='/create-post' className='post create-post'>
            <h2>Create a new post...</h2>
        </Link>

        <>
          {posts.map((post) => (
              <div className="post diner-post" onClick={() => {setButtonPopup(true); setSelectedPost(post.id);}} >
                  <img className="avatar" src={post.avatar_url}></img> 
                  <div className="diner-info"> 
                      <h2 className="truncate">{post.title}</h2>
                      <h5>{post.datetime}</h5>
                      {post.rating && post.num_ratings && <h3>{post.full_name} {post.rating}⭐ ({post.num_ratings} reviews)</h3>}
                  </div>
              </div>
          ))}
        </>
        
    </>
  )
}

export default Home;