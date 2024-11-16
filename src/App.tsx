import React from 'react';

import './index.css';
import LandingPage from './LandingPage/LandingPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <LandingPage/>
    </div>
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