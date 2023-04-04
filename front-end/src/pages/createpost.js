import './post.css'
import { useMemo, useState } from 'react'
import { Link } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

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
        <div className="create-post-form post-form">
            <h1>Create a Post</h1>
            <h3>Create a post to find a date to eat with at [Restaurant Name]!</h3>
            <form>
                <label>
                    <p>Title</p>
                    <input className="input" type="text" required />
                </label>

                <label>
                    <p>Date and Time</p>
                    <DateTimePicker
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
                    <textarea className="input" required />
                </label>
                <button className="post-btn"><Link to="home-lfd">Post</Link></button>
            </form>
        </div>
    );
}

export default CreatePost;