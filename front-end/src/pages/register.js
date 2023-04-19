import './login.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from "react-router-dom";
// const serverUrl = process.env.REACT_APP_SERVER_URL;
// const serverPort = process.env.REACT_APP_SERVER_PORT;

const Register = () => {

    return (
        <div className="register">
            <h1>Register</h1>

            <form>
                <div className="name">
                    <label>
                        <p>First Name</p>
                        <input className="input" type="text" required/>
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input className="input" type="text" required/>
                    </label>
                </div>
                <label>
                    <p>Email</p>
                    <input className="input" type="text" required/>
                </label>
                <label>
                    <p>Username</p>
                    <input className="input" type="text" required/>
                </label>
                <label>
                    <p>Mobile Number</p>
                    <input className="input" type="text" required/>
                </label>
                <label>
                    <p>DOB</p>
                    <DatePicker disableFuture/>
                </label>
                <label>
                    <p>Gender</p>
                    <select className="gender">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                    </select>
                </label>
                <label>
                    <p>Password</p>
                    <input className="input" type="password" required/>
                </label>
                <label>
                    <p>Re-enter Password</p>
                    <input className="input" type="password" required/>
                </label>
                <div className="link"><Link className="link" to='/login'>Already have an account? Login here!</Link></div>
                <div className="login-btn"><button>Register</button></div>
            </form>
        </div>
    );
}

export default Register;