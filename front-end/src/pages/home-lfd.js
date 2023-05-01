import { Link } from "react-router-dom";
import './home-lfd.css';
import { useEffect, useState } from 'react'
import Popup from "../components/Popup.js";
import axios from '../axiosInstance';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

const HomeLFD = () => {
    const [diners, setDiners] = useState([])
    const [selectedDiner, setSelectedDiner] = useState([-1]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [userData, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
        createdAt: '',
        requests: [],
        postId: ''
    });

    const userId = (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');

    useEffect(() => {
        axios.get(`/user/${userId}`)
        .then(res => setUser(res.data))
        .catch(e => console.error(e.response.data.message));
    }, [])

    useEffect(() => {
        fetchDinerRequests();
    }, [])

    const fetchDinerRequests = async () => {
        const randInt = Math.floor(Math.random() * (4) + 1);
        const dinerRequests = [];
        for(let i = 0; i < randInt; i++){
            // slug should be id of diner post in the future
            await axios.get(`${serverUrl}:${serverPort}/diner-request/${randInt}`)
                .then((res) => {
                    const request = res.data;
                    const dinerPost = ({
                        "id": request["id"],
                        "message": request["message"],
                        "full_name": request["full_name"],
                        "rating": request["rating"],
                        "num_ratings": request["num_ratings"],
                    });
                    dinerRequests.push(dinerPost);
                })
                .catch(err => console.log("Error: " + err ? err : "Unexpected error occurred."));
        }
        if(dinerRequests.length != 0) {
            setDiners([...dinerRequests]);
        }
    };

    const DinerRequest = (props) => {
        console.log(props)
        return (
            <div className={props.isSelected ? "diner-request selected" : "diner-request"} onClick={() => { props.onClick(props.id); setButtonPopup(true);}}>
                <div>
                </div>
                <div className="diner-info"> 
                    <h2 className="text">{props.full_name} <span className="text">{props.rating}⭐ ({props.num_ratings} reviews)</span></h2>
                    <h4 className="text">{props.message}</h4>
                </div>
            </div>
        );
    }
    
    const DinerRequests = (props) => {
        return (
          <div className='diner-requests'>
            {props.diners.map((dinerRequest) => (<DinerRequest
            key={dinerRequest.id}
            id={dinerRequest.id}
            full_name={dinerRequest.full_name}
            rating={dinerRequest.rating}
            num_ratings={dinerRequest.num_ratings}
            message={dinerRequest.message}
            isSelected={dinerRequest.id === props.selectedDiner}
            onClick={props.onClick}
            />))}
          </div>
        );
    }

    const handleDelete = async () => {
        const request = {
          user: userId,
          postId: userData.postId
        }
        await axios.post(`/delete-post`, request)
            .then((response) => console.log(response))
            .catch(e => console.error(e.response.data.msg));
    }

    return (
        <div className="homeLFD">
            <h1>Your Post</h1>

            <h2>{diners.length} people would like to go on the date with you!  Select the lucky diner who would be joining you!</h2>

            {diners.length > 0 ? <DinerRequests diners={diners} onClick={(id) => setSelectedDiner(id)} selectedDiner={selectedDiner}/>: 
                                <p>There's currently no one available, tough love :c</p>}
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <div className="otherUserProfile">
                            <h1>{diners[parseInt(selectedDiner)]?.full_name}</h1>
                            <div id="wrapper">
                                <div id="first"><img style={{ width: "200px", height: "200px", borderRadius: "80px", paddingBottom: "30px" }}
                                        src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt="" /></div>
                                <div id="second">The User bio will appear here...</div>
                            </div>
                            <div className="dec-btn"><div onClick={() => setButtonPopup(false)}><button>Decline</button></div></div>
                            <div className="acc-btn"><Link to="/date"><button>Accept</button></Link></div>
                        </div>
            </Popup>
            <button onClick={handleDelete}>Delete Post</button>
        </div>
    );
}

export default HomeLFD;