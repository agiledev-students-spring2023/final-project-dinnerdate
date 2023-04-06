import './login.css'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <h1>Log In</h1>
            
            <form>
                <label>
                    <p>Email or Username</p>
                    <input className="input" type="text" required/>
                </label>
                <label>
                    <p>Password</p>
                    <input className="input" type="password" required/>
                </label>
                <div className="login-btn"><button>Login</button></div>
                <div className="link"><Link className="link" to='/register'>Don't have an account? Register here!</Link></div>
            </form>
        </div>
    );
}

export default Login;