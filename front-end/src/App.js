
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Navbar from './components/Navbar'

import CreatePost from './pages/createpost'
import EditPost from './pages/editpost'
import Home from './pages/new_home'
import HomeConfirmed from './pages/homeConfirmed'
import HomeLFD from './pages/home-lfd'
import Inbox from './pages/inbox'
import RestaurantInfo from './pages/restaurant-info'
import Login from './pages/login'
import Profile from './pages/profile'
import Register from './pages/register'

function App() {
  return (
    <>
      <Router>
      <div className="App">
        <Navbar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="content">
            <Switch>
              <Route path="/inbox"><Inbox /></Route>
              <Route path="/create-post"><CreatePost /></Route>
              <Route path="/edit-post"><EditPost /></Route>
              
              <Route path="/profile"><Profile /></Route>

              <Route path="/login"><Login /></Route>           
              <Route path="/register"><Register /></Route>

              <Route path="/restaurant/:placeId"><RestaurantInfo /></Route>
              <Route path="/date"><HomeConfirmed /></Route>
              <Route path="/home-lfd"><HomeLFD /></Route>

              <Route path="/"><Home /></Route>
            </Switch>
          </div>
        </LocalizationProvider>
      </div>
    </Router>
    </>
  );
}

export default App;
