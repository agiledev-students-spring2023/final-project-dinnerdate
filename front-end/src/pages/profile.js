import { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import './profile.css';
import { useHistory } from "react-router-dom";
// const serverUrl = process.env.REACT_APP_SERVER_URL;
// const serverPort = process.env.REACT_APP_SERVER_PORT;

const Profile = () => {
  // const [userData, getUserData] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     axios.get(`/api/user`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch(e => console.error(e));
  //   }
  // }, [])

  const history = useHistory();
  const [userData, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthdate: '',
    gender: '',
    createdAt: ''
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const userId = (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '');

  useEffect(() => {
    axios.get(`/user/${userId}`)
    .then(res => setUser(res.data))
    .catch(e => console.error(e.response.data.message));
  }, [])

  const [image, setImage] = useState('https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png');

  const handleImageChange = (e) => {
    console.log('handleImageChange called');
    const file = e.target.files[0];
    console.log('Selected file:', file);
    setImage(URL.createObjectURL(file));
  };

  const handleEditClick = (e) => {
    console.log('Edit button clicked');
    const fileInput = document.getElementById('image-upload');
    console.log('File input:', fileInput);
    fileInput.click();
  };

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
    console.log("LOGGED OUT!");
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSave(e) {
    e.preventDefault();
    const formDataCopy = {...formData, userId};

    await axios.post(`/edit-profile`, formDataCopy, {params: {}})
    .then(() => {
        history.push('/profile');
    })
    .catch(e => console.error(e));

    console.log(formDataCopy);
  };

  const str = userData.birthdate;
  const temp = str.slice(0, 10);

  return (
    <div className="profile">
      <div className="box" style={{ paddingBottom: '30px' }}>
        <img
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '80px',
            paddingBottom: '30px',
          }}
          src={image}
          alt=""
        />
        <button onClick={handleEditClick}>Edit</button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className="editProfile">
        <form onSubmit={handleSave}>
          <label>
            <p>First Name</p>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder={userData.firstName} />
          </label>
          <label>
            <p>Last Name</p>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder={userData.lastName} />
          </label>
          <label>
            <p>Email</p>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder={userData.email} />
          </label>
          <div className="save-btn">
          <button>Save</button>
          </div>
          </form>
          <div className="noneditable">
          <label>
            <p>Birthdate</p>
            <input type="text" value={temp} readOnly/>
          </label>
          <label>
            <p>Gender</p>
            <input type="text" value={userData.gender} readOnly/>
          </label>
          </div>
        <div className="save-btn">
        <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

