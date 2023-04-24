import './post.css'
import { useMemo, useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from '../axiosInstance';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

const CreatePost = () => {
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
      title: '',
      date: '',
      description: ''
    });

    const history = useHistory();

    function handleChange(event) {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
    function handleDateChange(date) {
      handleChange({ target: { name: 'date', value: date }});
    }
    
    async function handleSubmit(event) {
      formData.date = new Date(formData.date).toLocaleDateString();
      event.preventDefault();
      await axios.post(`/create-post`, formData, {params: {}})
          .then((response) => {
              // Redirect to home page
              // history.push('/home-lfd');
              console.log("DONE")
          })
          .catch(e => console.error(e.response.data.msg));
  }

    const errorMessage = useMemo(() => {
        if (error == 'disablePast'){
            return 'You must schedule your date in the future.';
        }
        else{
            return '';
        }
      }, [error]);
    
    return (
        <div className="create-post-form post-form" onSubmit={handleSubmit}>
            <h1>Create a Post</h1>
            <h3>Create a post to find a date to eat with at [Restaurant Name]!</h3>
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

                <label>
                    <p>Date and Time</p>
                    <DateTimePicker
                      value={formData.date} 
                      onChange={handleDateChange}
                        defaultValue={dayjs().add(1, 'hour')}
                        disablePast
                        onError={(newError) => setError(newError)}
                        slotProps={{
                            textField: {
                            helperText: errorMessage,
                            },
                        }}/>
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