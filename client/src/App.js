import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Itinerary from './components/Itinerary';
import Community from './components/Community';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
// import Logout from './components/Logout';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar />

        </header>
        <body>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/itinerary" element={<Itinerary/>} />
            <Route path="/community" element={<Community/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            {/* <Route path="/logout" element={<Logout/>}/> */}
          </Routes>
        </body>
      </div>
    </Router>
  );
}

export default App;
