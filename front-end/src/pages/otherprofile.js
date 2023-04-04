import { Link } from "react-router-dom";
import './otherprofile.css'

const otherUserProfile = () => {
    return (
        <div className="otherUserProfile">
            <h1>[Diner Name], [Age]</h1>
            <div id="wrapper">
                <div id="first"><img style={{ width: "200px", height: "200px", borderRadius: "80px", paddingBottom: "30px" }}
                        src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="" /></div>
                <div id="second">The User bio will appear here...</div>
            </div>
            <div className="dec-btn"><Link to="/location-info"><button>Decline</button></Link></div>
            <div className="acc-btn"><Link to="/date"><button>Accept</button></Link></div>
        </div>
    );
}

export default otherUserProfile;