import { useContext } from "react";
import { HistoricContext } from "../context/HistoricContext";

// hook para facilitar a chamada do contexto
export const useHistoricContext = () => {
  const context = useContext(HistoricContext);
  // caso estiver algo errado com o contexto
  if (!context) {
    console.log("Contexto não encontrado.");
  }

  return context;
};
