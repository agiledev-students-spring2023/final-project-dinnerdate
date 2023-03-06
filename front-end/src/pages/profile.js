

const Profile = () => {
    return (
        <div className="profile">
            <div class="container">
            <div class="box">
                <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="profile image"/> 
            </div>
            <div class="About">
            <ul>
            <li><h4> Name: </h4></li>   
            <li> User's first name, last name</li>
            <li><h4>Email address: </h4></li>
            <li> User's email address</li>
           <li><h4>Phone number:</h4></li>
            <li><h4> User's phone number</h4></li>
           <li><h4> Date of birth:</h4></li>
            <li> User's DOB </li>
            </ul>
            </div>
        </div>
        </div>
    );
}

export default Profile;