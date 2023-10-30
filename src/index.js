import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// contexts
import { HeroesContextProvider } from "./context/HeroesContext";
import { UserContextProvider } from "./context/UserContext";
import { HistoricContextProvider } from "./context/HistoricContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HistoricContextProvider>
      <UserContextProvider>
        <HeroesContextProvider>
          <App />
        </HeroesContextProvider>
      </UserContextProvider>
    </HistoricContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
