import './post.css'
import { useMemo, useState } from 'react'
import { Link } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import axios from 'axios';


const samplePostData = [
    {
    "id": 0,
    "title": "Date Night Extraveganza",
    "date": "03/20/2023 08:15 PM",
    "description": "Join me for a night out with lots of fun and drinks!",
    }]

const EditPost = () => {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(samplePostData[0].title || '');
    const [dateTime, setDateTime] = useState('');
    const [description, setDescription] = useState(samplePostData[0].description || '');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/create-post', {
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

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };
    
    return (
        <div className="edit-post-form post-form">
            <h1>Edit Your Post</h1>
            <h3>Revise your post for [Resturant Name].</h3>
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
                <button className="post-btn" type='submit'>Confirm</button>
            </form>
        </div>
    );
}

export default EditPost;