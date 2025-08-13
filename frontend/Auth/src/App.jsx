import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

export default function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup setUser={setUser}/>}/>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route 
          path="/" 
          element={user ? <Home user={user} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}
