import './home.css';
import { useEffect, useState } from 'react'
import Popup from "../components/Popup.js";
import axios from '../axiosInstance';
import { useHistory } from 'react-router-dom';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

function HomeLFD() {
  const [selected, setSelected] = useState(1);
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);

  const userId = (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');

  useEffect(() => { // get postId
    axios.get(`/user/${userId}`)
    .then(res => {
      if (res.data.post) {
        setPostId(res.data.post)
      }
    })
    .catch(e => console.error(e));
  }, [])

  useEffect(() => { // get post
    if (!postId) return;
    axios.get(`/diner-post/${postId}`)
    .then(res => {
      setPost(res.data)
    })
    .catch(e => console.error(e));
  }, [postId])

  return (
    <div className="home">
          <h1>Your Post</h1>
          <h2>Title: {post?.title}</h2>
          <h4>Date and time: {new Date(post?.datetime).toLocaleString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric',
            timeZoneName: 'short'
            })}</h4>
          <h3>Description: {post?.description}</h3>
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
        <></>
    )
  }

export default HomeLFD;