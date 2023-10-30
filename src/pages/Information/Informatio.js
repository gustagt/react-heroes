
import { useParams } from "react-router-dom";
import styles from "./Information.module.css";
import { useHeroesContext } from "../../hooks/useHeroesContext";
import { useEffect, useState } from "react";


const Information = () => {
    const { heroes } = useHeroesContext();
    
    const {id} = useParams()
    const [hero, setHero] = useState()
   

    useEffect(()=>{
        setHero(heroes.find((hero) => hero.id === id))
    },[heroes])
  return (
    <div className={styles.card}>
        <p>{hero.name}</p>
    </div>
  );
};

export default Information;
