import './register.css';
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="login">
            <h1>Register</h1>

            <form >
                <label>
                <p>First Name</p>
                <input type="text" required/>
                </label>
                <label>
                <p>Last Name</p>
                <input type="text" required/>
                </label>
                <label>
                <p>Email</p>
                <input type="password" required/>
                </label>
                <label>
                <p>Password</p>
                <input type="password" required/>
                </label>
                <label>
                <p>Re-enter Password</p>
                <input type="password" required/>
                </label>
                <div className="reg-btn"><button>Register</button></div>
                <div className="link"><Link className="link" to='/login'>Already have an account? Login here!</Link></div>
            </form>
        </div>
    );
}

export default Register;