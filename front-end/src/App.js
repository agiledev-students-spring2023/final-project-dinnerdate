
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Navbar from './components/Navbar'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import CreatePost from './pages/createpost'
import Profile from './pages/profile'
import Inbox from './pages/inbox'
import HomeLFD from './pages/home-lfd'
import './index.css'

function App() {
  return (
    <>
      <BrowserRouter>
      <div className="App">
        <Navbar />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="content">
            <Switch>
              <Route path="/login"><Login /></Route>           
              <Route path="/register"><Register /></Route>

              <ProtectedRoute exact path="/"><Home /></ProtectedRoute>
              <Route path="/create-post/:placeId"><CreatePost /></Route>

              <ProtectedRoute path="/profile"><Profile /></ProtectedRoute>
              <ProtectedRoute path="/inbox"><Inbox /></ProtectedRoute>
              <ProtectedRoute path="/home-lfd"><HomeLFD /></ProtectedRoute>

            </Switch>
          </div>
        </LocalizationProvider>
      </div>
    </BrowserRouter>
    </>
  );
}

const ProtectedRoute = ( { children } ) => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (!user || !token) history.push('/login');
  return children;
};

export default App;
