import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserCircle2, Code2, FileCode2, User, LogOut } from 'lucide-react';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">
              <Code2 className="navbar-logo-icon" />
              <span className="navbar-logo-text">Dev Editor</span>
            </div>
            <div className="navbar-menu">
              <Link to="/problemset" className="navbar-item">
                <FileCode2 className="navbar-icon" />
                <span>Problems</span>
              </Link>
              <Link to="/profile" className="navbar-item">
                <User className="navbar-icon" />
                <span>Profile</span>
              </Link>
              <button className="navbar-item">
                <LogOut className="navbar-icon" />
                <span>Logout</span>
              </button>
              <div className="navbar-profile">
                <UserCircle2 className="navbar-profile-icon" />
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" />
          <Route path="/problemset" />
          <Route path="/profile"  />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



/*import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SelectRolePage from './components/SelectRolePage';
import { GlobalChat } from './components';
import SignUpForm from './components/SignUpForm';


const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<GlobalChat />} />
				<Route path="/signup" element={<SignUpForm/>} />
				<Route path="/login" element={<Login />} />
				<Route path="/select-role" element={<SelectRolePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;*/