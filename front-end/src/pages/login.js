import './login.css'
import Button from '../components/Button.js'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <h1>Log In</h1>

            <form >
                <label>
                <p>Email</p>
                <input type="text" required/>
                </label>
                <label>
                <p>Password</p>
                <input type="password" required/>
                </label>
                <div className="login-btn"><Button text="Login"/></div>
                <div className="link"><Link className="link" to='/register'>Don't have an account? Register here!</Link></div>
            </form>
        </div>
    );
}

export default Login;