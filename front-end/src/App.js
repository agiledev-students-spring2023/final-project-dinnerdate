
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Navbar from './components/Navbar'

import Chat from './pages/chat'
import Conversation from './pages/conversation'
import CreatePost from './pages/createpost'
import EditPost from './pages/editpost'
import Home from './pages/home'
import HomeConfirmed from './pages/homeConfirmed'
import HomeLFD from './pages/home-lfd'
import LocationInfo from './pages/location-info'
import Login from './pages/login'
import OtherProfile from './pages/otherprofile'
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
              <Route path="/chat"><Chat /></Route>
              <Route path="/conversation"><Conversation/></Route>

              <Route path="/create-post"><CreatePost /></Route>
              <Route path="/edit-post"><EditPost /></Route>
              
              <Route path="/user"><OtherProfile /></Route>
              <Route path="/profile"><Profile /></Route>

              <Route path="/login"><Login /></Route>           
              <Route path="/register"><Register /></Route>

              <Route path="/location-info"><LocationInfo /></Route>
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
