import '../App.css';
import Navbar from './Navbar';
import Home from './Home';
import Itinerary from './Itinerary';
import Community from './Community';
import Profile from './profile/Profile';
import Register from './Register';
import Login from './Login';
import SingleResturant from './SingleResturant'
import Logout from './Logout';
import SingleEvent from './SingleEvent'
import PostForm from './PostForm';
import PostDetails from './PostDetails';
import Communityid from './Communityid';
import PrivateRoute from './PrivateRoute';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {AuthProvider} from '../firebase/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header>
            <Navbar />

          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home/>} /> 
              <Route path="/itinerary" element={<PrivateRoute/>}>
                <Route path="/itinerary" element={<Itinerary/>} />
              </Route>
              <Route path="/itinerary/:id" element={<PrivateRoute/>}>
                <Route path="/itinerary/:id" element={<SingleResturant/>} />
              </Route>
              <Route path="/community" element={<PrivateRoute/>}>
                <Route path="/community" element={<Community/>} />
              </Route>
              
              <Route path="/community/:id" element={<PrivateRoute/>}>
                <Route path="/community/:id" element={<Communityid/>} />
              </Route>

              <Route path="/postform" element={<PrivateRoute />}>
                <Route path="/postform" element={<PostForm />} />
              </Route>

              <Route path="/community/:id" element={<PrivateRoute/>}>
                <Route path="/community/:id" element={<PostDetails/>}/>
              </Route>

              <Route path="/profile" element={<PrivateRoute/>}>
                <Route path="/profile" element={<Profile/>} />
              </Route>

              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<Logout/>}/>

              <Route path="/events/:id" element={<PrivateRoute/>}>
                <Route path="/events/:id" element={<SingleEvent/>}/>
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
