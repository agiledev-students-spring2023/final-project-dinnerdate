import './login.css';
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="login">
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
                    <input className="input" type="password" required/>
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