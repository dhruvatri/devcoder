import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './ComponentsLoginandRegister/SignUpForm/SignUpForm';
import Login from './ComponentsLoginandRegister/Login/Login';
import SelectRolePage from './ComponentsLoginandRegister/SelectRolePage/SelectRolePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/login' element={<Login />} />
		<Route path="/select-role" element={<SelectRolePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
