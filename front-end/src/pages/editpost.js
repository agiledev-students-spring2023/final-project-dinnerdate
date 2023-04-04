import './post.css'
import { useMemo, useState } from 'react'
import { Link } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

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
    const [description, setDescription] = useState(samplePostData[0].description || '');

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
            <form>
                <label>Title</label>
                <input className="input" 
                    type="text" 
                    value={title} 
                    onChange={changeTitle}
                    required />

                <label>Date and Time</label>
                <DateTimePicker
                    defaultValue={dayjs().add(1, 'hour')}
                    disablePast
                    onError={(newError) => setError(newError)}
                    slotProps={{
                        textField: {
                        helperText: errorMessage,
                        },
                    }}
                    />
                
                <label>Description</label>
                <textarea 
                    className="input"
                    value={description} 
                    onChange={changeDescription}
                    required />

                <button className="post-btn"><Link to="home-lfd">Confirm</Link></button>
            </form>
        </div>
    );
}

export default EditPost;