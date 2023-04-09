import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const mapContainerStyle = {
    width: "100%",
    height: "600px",
};

function NewHome() {
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <>
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
            console.log(selected);
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
                mapContainerStyle={mapContainerStyle}
                onClick={onClick}
            >
                {selected && <Marker position={ {lat: selected.lat, lng: selected.lng} } />}   {/* set a marker on selected position */}
            </GoogleMap>
        </>
    );
}

const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => { // when a place is chosen, select it
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const {lat, lng} = await getLatLng(results[0]);
        setSelected({ placeId: results[0].place_id, lat: lat, lng: lng }); 
    }

    return (
        <Combobox onSelect={handleSelect}>
        <ComboboxInput 
            value={value} 
            onChange={e => setValue(e.target.value)}
            disabled={!ready}
            className="combobox-input"
            placeholder="Search a restaurant"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && 
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description}/>
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

export default NewHome;