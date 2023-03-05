import NavBar from './components/NavBar'
import Home from './pages/home'
import Messages from './pages/messages'
import Profile from './pages/profile'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/messages"><Messages /></Route>
            <Route path="/profile"><Profile /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
