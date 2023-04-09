import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "600px",
};

function NewHome() {
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: "AIzaSyB1D7Olh84_bINSSNaJ5N9nsU6bq933y0U" 
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <>
            Hello.
            <Map />
        </>
    );
}

function Map() {
    return <GoogleMap 
        zoom={10} 
        center={{lat: 44, lng: -80}} 
        mapContainerStyle={mapContainerStyle}
    >

        
    </GoogleMap>
}

export default NewHome;

