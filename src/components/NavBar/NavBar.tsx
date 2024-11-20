import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle2, Code2, FileCode2, User, LogOut } from 'lucide-react';
import './NavBar.css';
import { useAuth } from '../../contexts/AuthProvider';

const NavBar = () => {
    const {user} = useAuth();
    const currUser = user?.uid;
    console.log(currUser);
  return (
    <div className="dev-navbar-app">
      <nav className="dev-navbar">
        <div className="dev-navbar-container">
          <div className="dev-navbar-logo">
            <Code2 className="dev-navbar-logo-icon" />
            <span className="dev-navbar-logo-text">Dev Editor</span>
          </div>
          <div className="dev-navbar-menu">
            <Link to="/problemset" className="dev-navbar-item">
              <FileCode2 className="dev-navbar-icon" />
              <span>Problems</span>
            </Link>
            <Link to="/profile" className="dev-navbar-item">
              <User className="dev-navbar-icon" />
              <span>Profile</span>
            </Link>
            { currUser!==undefined ? <div style={{display:'flex'}}>
                <button className="dev-navbar-item">
                <LogOut className="dev-navbar-icon" />
                <span>Logout</span>
                </button>
                <div className="dev-navbar-profile">
                <UserCircle2 className="dev-navbar-profile-icon" />
                </div>
            </div> : <div>
                <button className="dev-navbar-item-button">
                Login
                </button>
                <button className="dev-navbar-item-button">
                Register
                </button>
            </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
