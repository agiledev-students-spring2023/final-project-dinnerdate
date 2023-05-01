import './home.css';
import { useEffect, useState } from 'react'
import Popup from "../components/Popup.js";
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

function HomeLFD() {
  const [selected, setSelected] = useState(1);
  const [post, setPost] = useState(null);

  const userId = (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');

  useEffect(() => {
    axios.get(`/user/${userId}`)
    .then(res => {
      if (res) {
        // setPost(res.data.post)
        console.log(res.data);
      }
    })
    .catch(e => console.error(e));
  }, [])

  return (
    <div className="home">
          <h1>Your Post</h1>
          <Requests selected={selected} />
    </div>
  );
}
  
  const Requests = ({ selected }) => {
    const [requests, setRequests] = useState([]);
    const [selectedReq, setSelectedReq] = useState(-1);
    const [buttonPopup, setButtonPopup] = useState();

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
        .catch(e => console.error(e.response.data.message))
    }, [])

    useEffect(() => {
        if (userData && userData.post) {
            axios.get(`/diner-requests/${userData.post}`)
              .then(res => setRequests(res.data.map(e => ({key: e._id, ...e}))))
              .catch(err => console.log(err ? err : "Unexpected error occurred."));
        }
    }, [userData]);
  
    useEffect(() => {
      if(selectedReq == -1) return;
    }, [selectedReq])
    
    const history = useHistory();
    const handleDelete = async () => {
        const request = {
          user: userId,
          postId: userData.post
        }
        await axios.post(`/delete-post`, request)
            .then((response) => window.location.reload())
            .catch(e => console.error(e.response.data.msg));
    }

    const handleAccept = async (request) => {
        await axios.post(`/accept`, request)
        .then((response) => console.log(response))
        .catch(e => console.error(e.response.data.msg));
    }

    const handleDecline = async (request) => {
        await axios.post(`/decline`, request)
        .then((response) => console.log(response))
        .catch(e => console.error(e.response.data.msg));
    }

    return (
      <div className="posts">
        <h2>{requests.length ? `${requests.length} people would like to go on the date with you!  Select the lucky diner who would be joining you!` : "There's currently no one available."}</h2>
  
          {requests.map((request, index) => (
            <div className="post diner-post" key={index} onClick={() => {setButtonPopup(true); setSelectedReq(index);}} >
              <h2 className="truncate">{request._id}</h2>
              <h5></h5>
              <h3></h3>
            </div>
          ))}
  
        {requests && selectedReq != -1 && 
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div className="otherUserProfile">
            <h1>USER INFO</h1>
            <h3>blah</h3>
            <h4>blah</h4>
            <div id="wrapper">
              <div id="first">
                <img
                  style={{ width: "200px", height: "200px", borderRadius: "20px"}}
                  src={'https://picsum.photos/300/300'} /* Should be profile picture */
                />
              </div>
              <div id="second">other info</div>
            </div>
            <div className="acc-btn">
              <div onClick={() => { setSelectedReq(-1); setButtonPopup(false) }}>
              <div className="dec-btn"><div onClick={() => {setButtonPopup(false); handleDecline(requests[selectedReq]); window.location.reload(true)}}><button>Decline</button></div></div>
                <div className="acc-btn"><button onClick={() => {handleAccept(requests[selectedReq])}}>Accept</button></div>
                <button className="close-btn">close</button>
              </div>
            </div>
          </div>
        </Popup>}
        <button onClick={handleDelete}>Delete Post</button>
      </div>
    )
  }

export default HomeLFD;