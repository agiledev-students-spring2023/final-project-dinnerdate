import Navbar from './components/Navbar'
import Messages from './pages/messages'
import Profile from './pages/profile'
import EditPost from './pages/editpost'
import Login from './pages/login'
import LocationInfo from './pages/location-info'
import CreatePost from './pages/createpost'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/messages"><Messages /></Route>
            <Route path="/profile"><Profile /></Route>
            <Route path="/edit-post"><EditPost /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/location-info"><LocationInfo /></Route>
            <Route path="/create-post"><CreatePost /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
