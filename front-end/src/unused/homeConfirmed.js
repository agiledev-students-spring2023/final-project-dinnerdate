import './homeConfirmed.css';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

const HomeConfirmed = () => {
    const [diner, setDiner] = useState(null);

    useEffect(() => {
        fetchDinerInfo();
    }, [])

    const fetchDinerInfo = () => {
        // temporary display info
        Axios.get(`${serverUrl}:${serverPort}/diner-post/-1`)
            .then((res) => {
                setDiner({
                    "full_name": res.data["full_name"],
                    "datetime": res.data["datetime"],
                })
            })
            .catch(err => console.log("Error: " + err ? err : "Unexpected error occurred."));
    };

    return (
        <div className="homeConfirmed">
            <h1>Date with {diner?.full_name}</h1>
            <h3>You have a date with {diner?.full_name} at Joe's Pizza on {diner?.datetime}. Don’t be late!</h3>

            <Link className='options' to="/inbox"><button>Chat</button></Link>
            {/* Implement Get Directions in the future */}
            <Link className='options' to="/"><button>Edit Date</button></Link>
            <Link className='options' to="/home"><button>Cancel Date</button></Link>
        </div>
    );
}

export default HomeConfirmed;