// React
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components

// pages
import Home from "./pages/Home";


// contexts

import "./App.css";

function App() {
  //usuario do contexto


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/Home"
            element={ <Home /> }
          ></Route>
          <Route path="*" element={<Navigate to="/Home" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
