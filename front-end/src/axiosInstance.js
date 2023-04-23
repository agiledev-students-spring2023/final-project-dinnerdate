import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

const instance = axios.create({
  baseURL: `${serverUrl}:${serverPort}`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default instance;

// Import axios from here instead of from axios
// Sends Authorization header with jwtToken