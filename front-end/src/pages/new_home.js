import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import axios from '../axiosInstance';
import './new_home.css';

const libraries = ["places"];
function Home() {
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // console.log(token);
        }
      }, []);

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <>
            <h1>Find / Create a Date</h1>
            <h4>Select or search for a restaurant, then press "Go"!</h4>
            <Map />
        </>
    );
}

function Map() { 
    const [currPosition, setCurrPosition] = useState(null);
    useEffect(() => { // get current position once
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
                setCurrPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            },
            error => {
              console.error(error);
            }
          );
        }
      }, []);

    const [selected, setSelected] = useState(null); // selected = {placeId, lat, lng}
    useEffect(() => { // when a location is selected, set it as current position
        if (selected) {
            setCurrPosition( {lat: selected.lat, lng: selected.lng} );
        }
    }, [selected])

    const onClick = (e) => {  // when place is clicked, select it
        if (e.placeId){
            setSelected({ placeId:e.placeId , lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
    }

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <GoogleMap 
                zoom={15} 
                center={currPosition} 
                mapContainerStyle={ { width: "600px", height: "600px" } }
                onClick={onClick}
            >
                {selected && <Marker position={ {lat: selected.lat, lng: selected.lng} } />}   {/* set a marker on selected position */}
            </GoogleMap>
            {selected ? <h1><Link to={`/restaurant/${selected.placeId}`}> Go </Link></h1> : ""}
        </>
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
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
  
    return (
      <div ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search for a restaurant"
        />
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    );
  };

export default Home;