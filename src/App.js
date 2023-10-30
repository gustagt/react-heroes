// React
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components

// pages
import Home from "./pages/Home/Home";


// contexts

import "./App.css";
import Information from "./pages/Information/Informatio";
import { useEffect } from "react";
import { useFetchHeroes } from "./hooks/useFetchHeroes";
import { useHeroesContext } from "./hooks/useHeroesContext";

function App() {
  //usuario do contexto

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<Home />}
          ></Route>        
            <Route
            path="/info/:id"
            element={<Information />}
          ></Route>
          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
