import { getAuth } from "firebase/auth";

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./sass/main.scss";

import Header from "./components/header/Header";
import Search from "./routes/search/Search";
import Signin from "./components/auth/Signin";

const instructions = (
  <span>Navigate to the Search page to search for movie by title.</span>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
    });
  });

  if (loading) {
    return (
      <h1 style={{ marginTop: "8rem", textAlign: "center" }}>Loading...</h1>
    );
  }

  return currentUser ? (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={instructions} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<h1>Route not found!</h1>} />
      </Routes>
    </div>
  ) : (
    <Signin />
  );
}

export default App;
