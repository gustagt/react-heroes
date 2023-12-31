import { useContext } from "react";
import { HeroesContext } from "../context/HeroesContext";

// hook para facilitar a chamada do contexto
export const useHeroesContext = () => {
  const context = useContext(HeroesContext);

  // caso estiver algo errado com o contexto
  if (!context) {
    console.log("Contexto não encontrado.");
  }

  return context;
};
