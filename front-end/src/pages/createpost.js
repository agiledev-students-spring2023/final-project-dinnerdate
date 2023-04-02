import './createpost.css'
import Button from '../components/Button.js'
import { Link } from "react-router-dom";

import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMemo, useState } from 'react'

const CreatePost = () => {
    const [error, setError] = useState(null);

    const errorMessage = useMemo(() => {
        if (error == 'disablePast'){
            return 'You must schedule your date in the future.';
        }
        else{
            return '';
        }
      }, [error]);
    
    return (
        <div className="create-post">
            <h1>Create a Post</h1>
            <h3>Create a post to find a date to eat with at [Restaurant Name]!</h3>

            <form>
                <label>Title</label>
                <input 
                    type="text"
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
                    required
                ></textarea>
                <div className="right-btn">
                    <Link to="home-lfd">
                    <Button text="Post"/>
                    </Link>
                </div>
                
            </form>
        </div>
    );
}

export default CreatePost;