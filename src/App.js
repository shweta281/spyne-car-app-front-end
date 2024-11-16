import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CarList from './components/Car/CarList';
import CarForm from './components/Car/CarForm';
import CarDetail from './components/Car/CarDetail';
import CarEdit from './components/Car/CarEdit';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [login, setLogin] = useState(false);
  const data = localStorage.getItem('token');
console.log(data);

  return (
    <Router>
      <Header islogin={setLogin}/>
      <Routes>
        {login ? <Route path="/" element={<CarList />} /> : <Route path="/" element={<Login />} />}
        <Route path="/login" element={<Login islogin={setLogin}/>} />
        <Route path="/signup" element={<Signup islogin={setLogin}/>} />
        <Route path="/CarList" element={<CarList islogin={setLogin}/>} />
        {login? <Route path="/add-car" element={<CarForm islogin={setLogin}/>} /> : <Route path="/add-car" element={<Login islogin={setLogin}/>} />}
        <Route path="/add-car" element={<CarForm islogin={setLogin}/>} />
        <Route path="/car/:id" element={<CarDetail islogin={setLogin}/>} />
        <Route path="/car/edit/:id" element={<CarForm islogin={setLogin}/>} />
        <Route path="/cars/update/:id" element={<CarEdit islogin={setLogin}/>} />
      </Routes>
    </Router>
  ); 
}

export default App;
