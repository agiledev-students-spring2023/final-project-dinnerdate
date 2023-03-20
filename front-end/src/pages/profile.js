
const Profile = () => {
    return (
        <div className="profile">
            <div class="container">
            <div class="box" style={{paddingBottom:"30px"}}>
                <img style={{width:"200px", height:"200px", borderRadius:"80px", paddingBottom:"30px"}}
                src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt=""/> 
                <button>edit</button>
            </div>
            <div class="About">
            <div style={{paddingBottom:"10px"}}>
                <h3 style={{paddingBottom:"5px"}}><button>edit</button> Name: </h3>  
                    <p> User's first name, last name</p>
            </div>
            <div style={{paddingBottom:"10px"}}>
                <h3 style={{paddingBottom:"5px"}}><button>edit</button> Bio:</h3>
                <p> Description user will write about themselves for other viewers to see</p>
            </div>
            <div style={{paddingBottom:"10px"}}>
                <h3 style={{paddingBottom:"5px"}}><button>edit</button> Email address: </h3>
                 <p> User's email address</p>
            </div>
            <div style={{paddingBottom:"10px"}}>
                <h3 style={{paddingBottom:"5px"}}><button>edit</button> Phone number:</h3>
                    <p> User's phone number</p>
            </div>
            <div style={{paddingBottom:"10px"}} >
                <h3 style={{paddingBottom:"5px"}}><button>edit</button> Date of birth:</h3>
                    <p> User's DOB </p>
            </div>
            <div style={{paddingBottom:"10px"}}>
            <h3 style={{paddingBottom:"5px"}}><button>edit</button> Password:</h3>
                    <p> ********* </p>
            </div>
            </div>
            <div style={{padding:"30px"}}>
                <h3>Your last post:</h3>
                <p>User's last post they uploaded for date</p>
                <p style={{fontSize:"10px"}}>Date and time post was created</p>
            </div>
        </div>
        </div>
    );
}

export default Profile;