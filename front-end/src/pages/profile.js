import './profile.css'
import Button from '../components/Button.js'
const Profile = () => {
    return (
        <div className="profile">
            <div class="box" style={{ paddingBottom: "30px" }}>
                    <img style={{ width: "200px", height: "200px", borderRadius: "80px", paddingBottom: "30px" }}
                        src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="" />
                    <Button text="Edit"/>
            </div>
            <div className='editProfile'>
                <form >
                    <label>
                    <p>Name</p>
                    <input type="text" placeholder="User Name"/>
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
                    <input type="password" placeholder="MM/DD/YYYY"/>
                    </label>
                    <label>
                    <p>Password</p>
                    <input type="password" placeholder="********"/>
                    </label>
                    <div className="save-btn"><Button text="Save"/></div>
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