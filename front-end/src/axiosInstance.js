import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
  baseURL: `${serverUrl}`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default instance;

// Import axios from here instead of from axios
// Sends Authorization header with jwtToken