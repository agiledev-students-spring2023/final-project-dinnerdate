import './post.css'
import { useMemo, useState } from 'react'
import { Link } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

const CreatePost = () => {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(`${serverUrl}:${serverPort}/create-post`, {
            title,
            dateTime,
            description,
          });
          console.log(response.data);
          // Reset form after successful submission
          setTitle('');
          setDateTime('');
          setDescription('');
        } catch (error) {
          console.error(error);
        }
      };

      const handleDateTimeChange = (date) => {
        setDateTime(date);
      };

    const errorMessage = useMemo(() => {
        if (error == 'disablePast'){
            return 'You must schedule your date in the future.';
        }
        else{
            return '';
        }
      }, [error]);
    
    return (
        <div className="create-post-form post-form">
            <h1>Create a Post</h1>
            <h3>Create a post to find a date to eat with at [Restaurant Name]!</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Title</p>
                    <input className="input" 
                    type="text" 
                    value={title} 
                    onChange = {(e) => setTitle(e.target.value)} 
                    required />
                </label>

                <label>
                    <p>Date and Time</p>
                    <DateTimePicker
                      value = {dateTime}
                      onChange = {handleDateTimeChange}
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
                      value={description} 
                      className="input" 
                      required 
                      onChange={(e) => setDescription(e.target.value)} />
                </label>
                <Link to="/home-lfd"><button className="post-btn" type="submit">Post</button></Link>
            </form>
        </div>
    );
}

export default CreatePost;