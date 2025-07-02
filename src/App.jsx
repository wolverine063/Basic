import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./Title";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import { UserContext } from "./context/Context";

function App() {
  const fruits = {
    apple: "red",
    banana: "yellow",
    grape: "purple",
  };

  return (
    <UserContext.Provider value={fruits}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {/* <Title /> */}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
