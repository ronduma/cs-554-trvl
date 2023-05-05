import '../App.css';
import {Link} from 'react-router-dom';

import {
  Typography
} from '@mui/material';

function Navbar() {
  return (
    <Typography
      fontSize={24}
    > 
      <div className="navbar">
        <div className="navbar-logo">
          <Link className="navbar-link" to="/">T R V L</Link>
        </div>
        <Link className="navbar-link" to="/itinerary">Itinerary</Link>
        <Link className="navbar-link" to="/community">Community</Link>
        <Link className="navbar-link" to="/profile">Profile</Link>
        <Link className="navbar-link" to="/register">Register</Link>
        <Link className="navbar-link" to="/login">Login</Link>
      </div>
    </Typography>
  );
}

export default Navbar;
