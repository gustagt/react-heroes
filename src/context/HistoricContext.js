import { createContext, useState } from "react";

export const HistoricContext = createContext([]);

export const HistoricContextProvider = ({ children }) => {
    // pega o que estiver no localstorage
    const data = JSON.parse(localStorage.getItem("historic"));

    // se for null coloca um array vazio inicial, se ja tiver algo armazenar o que recebeu
  const [historic, setHistoric] = useState(data ? data:[]);

  return (
    <HistoricContext.Provider value={{ historic, setHistoric }}>
      {children}
    </HistoricContext.Provider>
  );
};
