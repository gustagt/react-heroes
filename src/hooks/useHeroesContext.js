import { useContext } from "react";
import { HeroesContext } from "../context/HeroesContext";


export const useHeroesContext = () => {
  const context = useContext(HeroesContext);

  if (!context) {
    console.log("Contexto não encontrado.");
  }

  return context;
};
