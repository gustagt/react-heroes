import { createContext, useState } from "react";

export const HeroesContext = createContext();

export const HeroesContextProvider = ({ children }) => {
  const [heroes, setHeroes] = useState([]);

  return (
    <HeroesContext.Provider value={{ heroes, setHeroes }}>
      {children}
    </HeroesContext.Provider>
  );
};
