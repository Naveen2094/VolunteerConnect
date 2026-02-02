import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import Apply from './Apply.jsx';
import Programs from './Programs.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Contact from './Contact.jsx';
import Admin from "./Admin.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import CreateProgram from "./CreateProgram.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />  
        <Route path="/programs" element={<Programs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-program" element={<CreateProgram />} />
        <Route path="/register" element={<Register />} />


      </Routes>
    </Router>
  );
}

export default App;
