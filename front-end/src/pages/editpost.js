import './editpost.css'
import Button from '../components/Button.js'
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMemo, useState } from 'react'

const samplePostData = [
    {
    "id": 0,
    "title": "Date Night Extraveganza",
    "date": "03/20/2023 08:15 PM",
    "description": "Join me for a night out with lots of fun and drinks!",
    }]

const EditPost = (props) => {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(samplePostData[0].title || '');
    const [description, setDescription] = useState(samplePostData[0].description || '');
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
      };
      const handleChangeDescription = (event) => {
        setDescription(event.target.value);
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
        <div className="edit-post">
            <h1>Edit Your Post</h1>
            <h3>Revise your post to find a date to eat with at [Resturant Name]!</h3>

            {/* Repeat of jsx from createpost */}
            <form>
                <label>Title</label>
                <input 
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                    required
                />
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
                    value={description}
                    onChange={handleChangeDescription}
                    required
                ></textarea>
                <div className="middle-btn"><Button text="Post"/></div>
                
            </form>
        </div>
    );
}

export default EditPost;