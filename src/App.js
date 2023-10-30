// React
// hooks react
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// css
import "./App.css";

// pages
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Information from "./pages/Information/Informatio";
import Historic from "./pages/Historic/Historic";

// contexts
import { useUserContext } from "./hooks/useUserContext";

function App() {

  //recebe o usuario no context para validações
  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/home" element={user ? <Home /> : <Navigate to="/menu" />}></Route>
          <Route path="/info/:id" element={user ? <Information /> : <Navigate to="/menu" />}></Route>
          <Route path="/historic" element={<Historic /> }></Route>
          <Route path="*" element={<Navigate to="/menu" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
