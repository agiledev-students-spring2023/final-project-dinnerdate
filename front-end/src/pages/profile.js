import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import './profile.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// const serverUrl = process.env.REACT_APP_SERVER_URL;
// const serverPort = process.env.REACT_APP_SERVER_PORT;

const Profile = () => {
  const [userData, getUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`/api/user`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(e => console.error(e));
    }
  }, [])
  
  return (
    <div className="profile">
      hi
    </div>
  );
};

export default Profile;

