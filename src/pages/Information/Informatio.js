// css
import styles from "./Information.module.css";

// hooks react
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// hooks personalizados
import { useHeroesContext } from "../../hooks/useHeroesContext";

// components
import Copyright from "../../components/Copyright/Copyright";
import Navbar from "../../components/Navbar/Navbar";

// Mui Components
import { Button, Divider, Typography } from "@mui/material";

const Information = () => {
  // recebe o indice pela url
  const { id } = useParams();

  // lista recebida pelo context
  const { heroes } = useHeroesContext();
  
  // state do heroi
  const [hero, setHero] = useState();
  
  const navigate = useNavigate();

  // faz a busca do heroi na lista
  useEffect(() => {
    if (!heroes) return;
    setHero(heroes.find((hero) => hero.id == id));
  }, [heroes]);


  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        {hero && (
          <div className={styles.card}>
            <div className={styles.containerTop}>
              <div className={styles.containerImg}>
                <img src={hero.images.lg} alt={hero.name} />
              </div>
              <div>
                <Typography variant="h3">{hero.name}</Typography>
                <Typography variant="h5">Biografia</Typography>
                <Typography>Alinhamento: {hero.biography.alignment}</Typography>
                <Typography variant="body1">
                  Primeira Aparição: {hero.biography.firstAppearance}
                </Typography>
                <Typography>
                  Local de Nascimento: {hero.biography.placeOfBirth}
                </Typography>
                <Typography>Editora: {hero.biography.publisher}</Typography>
              </div>
            </div>
            <div>
              <div className={styles.spacing}>
                <Divider />
                <Typography variant="h5">Conexões</Typography>
                <Typography>
                  Grupo ou Afiliação: {hero.connections.groupAffiliation}
                </Typography>
                <Typography variant="body1">
                  Parentes: {hero.connections.relatives}
                </Typography>
              </div>
              <div className={styles.spacing}>
                <Divider />
                <Typography variant="h5">Pontos de Poder</Typography>
                <Typography>Combate: {hero.powerstats.combat}</Typography>
                <Typography variant="body1">
                  Durabilidade: {hero.powerstats.durability}
                </Typography>
                <Typography variant="body1">
                  Inteligência: {hero.powerstats.intelligence}
                </Typography>
                <Typography variant="body1">
                  Poder: {hero.powerstats.power}
                </Typography>
                <Typography variant="body1">
                  Velocidade: {hero.powerstats.speed}
                </Typography>
                <Typography variant="body1">
                  Força: {hero.powerstats.strength}
                </Typography>
                <Divider />
              </div>
              <div className={styles.spacing}>
                <Typography variant="h5">Trabalho</Typography>
                <Typography>Local: {hero.work.base}</Typography>
                <Typography variant="body1">
                  Ocupação: {hero.work.occupation}
                </Typography>
              </div>
            </div>
            <Button onClick={() => navigate("/home")}>Voltar</Button>
            <Copyright></Copyright>
          </div>
        )}
      </div>
    </>
  );
};

export default Information;
