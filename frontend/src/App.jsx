// import { useState } from "react";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const [loggedIn, setLoggedIn] =
//     useState(!!localStorage.getItem("token"));

//   return loggedIn
//     ? <Dashboard />
//     : <Login setLoggedIn={setLoggedIn} />;
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Navbar from './pages/Navbar';
import AuthPage from './pages/Login';
import { ToastContainer } from 'react-toastify';
  // import "react-toastify/dist/ReactToastify.css"
import { UserProvider } from './context/UserContext.jsx';

function App() {
  return (
      <UserProvider>
            <Router>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
      </UserProvider>
  );
}

export default App;

