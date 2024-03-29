import './createpost.css'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from '../axiosInstance';

const CreatePost = () => {
    const history = useHistory();
    const { placeId } = useParams();
    const [restaurantData, setRestaurantData] = useState(null);
    const [formData, setFormData] = useState({
      placeId: placeId,
      author: JSON.parse(localStorage.getItem('user')).id,
      title: '',
      datetime: dayjs().add(1, 'hour'),
      description: '',
    });


    useEffect(() => {
      axios.get(`/restaurant/${placeId}`)
        .then(res => {setRestaurantData(res.data)})
        .catch(e => console.error(e.response.data.message));
    }, [])


    // 250 character limit on post
    function handleChange(event) {
      const { name, value } = event.target;
      if (name==='description'){
      setFormData({ ...formData, [name]: value.slice(0,250)});
      } else {
        setFormData({...formData, [name]: value});
      }
    }

    const handleDateChange = (date) => {
      setFormData({ ...formData, datetime: date });
    };
    
    async function handleSubmit(event) {
      const formDataCopy = {...formData};
      formDataCopy.date = new Date(formDataCopy.date);
      event.preventDefault();
      await axios.post(`/create-post`, formDataCopy)
        .then((response) => {
          history.push('/'); 
          window.location.reload();
        })
        .catch(e => console.error(e.response.data.msg));
  }

    return (
        <div className="create-post-form post-form" onSubmit={handleSubmit}>
            <h1>Create a Post for {restaurantData ? restaurantData.name : ""}!</h1>
            <form>
                <label>
                    <p>Title</p>
                    <input className="input" 
                    type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={handleChange}
                    required />
                </label>

                <label className="datetime-label">
                    <p>Date and Time</p>
                    <DateTimePicker
                      value={formData.datetime}
                      onChange={handleDateChange}
                      disablePast
                    />
                </label>

                <label>
                    <p>Description</p>
                    <textarea 
                      name="description"
                      value={formData.description} 
                      className="input" 
                      required 
                      onChange={handleChange}/>
                </label>
                <button className="post-btn" type="submit">Post</button>
            </form>
        </div>
    );
}

export default CreatePost;