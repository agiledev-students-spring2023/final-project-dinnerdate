import './profile.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Profile = () => {
    return (
        <div className="profile">
            <div class="box" style={{ paddingBottom: "30px" }}>
                    <img style={{ width: "200px", height: "200px", borderRadius: "80px", paddingBottom: "30px" }}
                        src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png" alt="" />
                    <button>Edit</button>
            </div>
            <div className='editProfile'>
                <form >
                    <label>
                    <p>Name</p>
                    <input type="text" placeholder="User Name"/>
                    </label>
                    <label>
                    <p>User Name</p>
                    <input type="text" placeholder="username"/>
                    </label>
                    <label>
                    <p>Email</p>
                    <input type="text" placeholder="email@email.com"/>
                    </label>
                    <label>
                    <p>Phone</p>
                    <input type="text" placeholder="000-000-0000"/>
                    </label>
                    <label>
                    <p>DOB</p>
                    <DatePicker disableFuture/>
                    </label>
                    <label>
                    <p>Password</p>
                    <input type="password" placeholder="********"/>
                    </label>
                    <div className="save-btn"><button>Save</button></div>
                </form>
            </div>
            <div style={{padding:"30px"}}>
                <h3>Your last post:</h3>
                <p>User's last post they uploaded for date</p>
                <p style={{fontSize:"10px"}}>Date and time post was created</p>
            </div>
        </div>
    );
}

export default Profile;