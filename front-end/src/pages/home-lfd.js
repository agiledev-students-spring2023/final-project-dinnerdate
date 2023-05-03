import './home.css';
import { useEffect, useState } from 'react'
import Popup from "../components/Popup.js";
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';

function HomeLFD() {
  const [selected, setSelected] = useState(1);
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const userId = (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');

  useEffect(() => { // get postId from user
    axios.get(`/user/${userId}`)
    .then(res => {
      if (res.data.post) {
        setPostId(res.data.post)
      }
    })
    .catch(e => console.error(e));
  }, [])

  useEffect(() => { // get post from postId
    if (!postId) return;
    axios.get(`/diner-post/${postId}`)
    .then(res => {
      setPost(res.data)
    })
    .catch(e => console.error(e));
  }, [postId])

  useEffect(() => { // get restaurant data from post
    if (!post) return;
    axios.get(`/restaurant/${post.placeId}`)
    .then(res => {
      setRestaurant(res.data);
    })
  }, [post])

  return (
    <div className="home">
          <h1>Your Post for:</h1>
          <h2>{restaurant?.name}</h2>
          <p>{restaurant?.address}</p>
          <h3>Title</h3>
          <p>{post?.title}</p>
          <h3>Date and time</h3>
          <p>{new Date(post?.datetime).toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric',
            timeZoneName: 'short'
            })}</p>
          <h3>Description</h3>
          <p>{post?.description}</p>
          <br/>
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
              <h2 className="truncate">{request?.requesterId?.firstName} {request?.requesterId?.lastName}</h2>
            </div>
          ))}
  
        {requests && selectedReq != -1 && 
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div className="otherUserProfile">
            <div className="acc-btn">
              <div onClick={() => { setSelectedReq(-1); setButtonPopup(false) }}>
              <div className="btn-container">
                <div className="dec-btn"><div onClick={() => {setButtonPopup(false); handleDecline(requests[selectedReq]); window.location.reload(true)}}><button>Decline</button></div></div>
                <div className="acc-btn"><button onClick={() => {handleAccept(requests[selectedReq])}}>Accept</button></div>
              </div>
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