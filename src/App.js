import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CarList from './components/Car/CarList';
import CarForm from './components/Car/CarForm';
import CarDetail from './components/Car/CarDetail';
import CarEdit from './components/Car/CarEdit';
import Header from './components/Header';

function App() {
  const data = localStorage.getItem('token');
console.log(data);

  return (
    <Router>
      <Header />
      <Routes>
        {data ? <Route path="/" element={<CarList />} /> : <Route path="/" element={<Login />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/CarList" element={<CarList />} />
        {data? <Route path="/add-car" element={<CarForm />} /> : <Route path="/add-car" element={<Login />} />}
        <Route path="/add-car" element={<CarForm />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/car/edit/:id" element={<CarForm />} />
        <Route path="/cars/update/:id" element={<CarEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
