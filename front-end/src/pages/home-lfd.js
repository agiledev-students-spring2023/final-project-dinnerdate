import { Link } from "react-router-dom";
import './home-lfd.css';
import { useState } from 'react'
import Popup from "../components/Popup.js";
// import DinerRequests from '../components/DinerRequests';

const sampleDinerData = [
    {
    "id": 0,
    "message": "an apple a day... read more",
    "author": "Johnny Appleseed",
    "rating": "4.8",
    "num_ratings": "14"
    },
    {
    "id": 1,
    "message": "hi there!",
    "author": "Johnny Peachseed",
    "rating": "4.5",
    "num_rating": "7"
    },
    {
    "id": 2,
    "message": "would really like to go on this date!",
    "author": "Johnny Noseed",
    "rating": "1.1",
    "num_rating": "44"
    }];


const HomeLFD = () => {
    const [diners, setDiners] = useState([...sampleDinerData])
    const [selectedDiner, setSelectedDiner] = useState([-1]);
    const [buttonPopup, setButtonPopup] = useState(false);

    const DinerRequest = (props) => {
        console.log(props)
        return (
            <div className={props.isSelected ? "diner-request selected" : "diner-request"} onClick={() => { props.onClick(props.id); setButtonPopup(true);}}>
                <div>
                    {/* profile picture here */}
                </div>
                <div className="diner-info"> 
                    <h2 className="text">{props.author} <span className="text">{props.rating}⭐ ({props.num_ratings} reviews)</span></h2>
                    <h4 className="text">{props.message}</h4>
                    {/* title, date, time, author, rating, num_ratings */}
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
            author={dinerRequest.author}
            rating={dinerRequest.rating}
            num_ratings={dinerRequest.num_ratings}
            message={dinerRequest.message}
            isSelected={dinerRequest.id === props.selectedDiner}
            onClick={props.onClick}
            />))}
          </div>
        );
    }

    return (
        <div className="homeLFD">
            <h1>Your Post</h1>

            <h2>{diners.length} people would like to go on the date with you!  Select the lucky diner who would be joining you!</h2>

            {diners.length > 0 ? <DinerRequests diners={diners} 
                                                onClick={(id) => setSelectedDiner(id)} 
                                                selectedDiner={selectedDiner}/>: 
                                <p>There's currently no one available, tough love :c</p>}
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <div className="otherUserProfile">
                            <h1>[Diner Name], [Age]</h1>
                            <div id="wrapper">
                                <div id="first"><img style={{ width: "200px", height: "200px", borderRadius: "80px", paddingBottom: "30px" }}
                                        src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt="" /></div>
                                <div id="second">The User bio will appear here...</div>
                            </div>
                            <div className="dec-btn"><div onClick={() => setButtonPopup(false)}><button>Decline</button></div></div>
                            <div className="acc-btn"><Link to="/date"><button>Accept</button></Link></div>
                        </div>
            </Popup>
            <Link className="get-directions" to="/">Get Directions</Link>
            <Link className="edit-post" to="edit-post"><button>Edit Post</button></Link>
            <Link className="remove-post" to="/"><button>Remove Post</button></Link>
        </div>
    );
}

export default HomeLFD;