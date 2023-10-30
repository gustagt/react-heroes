import { createContext, useState } from "react";


export const HeroesContext = createContext();

export const HeroesContextProvider = ({ children }) => {

  // estado inicial da lista de herois
  const [heroes, setHeroes] = useState([]);

  return (
    <HeroesContext.Provider value={{ heroes, setHeroes }}>
      {children}
    </HeroesContext.Provider>
  );
};
