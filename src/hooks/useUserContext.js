import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// hook para facilitar a chamada do contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  // caso estiver algo errado com o contexto
  if (!context) {
    console.log("Contexto não encontrado.");
  }

  return context;
};
