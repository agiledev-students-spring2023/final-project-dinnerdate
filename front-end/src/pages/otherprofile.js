
const otherUserProfile = () => {
    return (
        <div className="otherprofile">
                <h2> User name </h2>
                <div class="box" style={{ paddingBottom: "30px" }}>
                    <img style={{ width: "200px", height: "200px", borderRadius: "80px", paddingBottom: "30px" }}
                        src="https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" alt="" />
                    <button>edit</button>
                </div>
                <div class="About">
                    <div style={{ padding: "10px" }}>
                        <h3 style={{ paddingBottom: "5px" }}> Name: </h3>
                        <p> User name</p>
                    </div>
                    <div style={{ paddingBottom: "10px" }}>
                        <h3 style={{ paddingBottom: "5px" }}> Age: </h3>
                        <p> User's age</p>
                    </div>
                    <div style={{ paddingBottom: "10px" }}>
                        <h3 style={{ paddingBottom: "5px" }}> Bio:</h3>
                        <p> Description user will write about themselves for other viewers to see</p>
                    </div>
                </div>
                <div style={{ align: "left" }}>
                    <button> Decline Date </button>
                </div>
                <div style={{ align: "right" }}>
                    <button> Accept Date </button>
                </div>
            </div>
    );
}

export default otherUserProfile;