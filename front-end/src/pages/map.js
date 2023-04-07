import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map() {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    // const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });

    return <div>Mappeey</div>
}

export default Map;

