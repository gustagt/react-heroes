// css
import styles from "./CardHistoric.module.css";

// Mui Components
import Typography from "@mui/material/Typography";

// recebe um historico de partida e o id que eles ta no array principal
const CardHistoric = ({ game, id }) => {

  return (
    <div className={styles.containerMain}>
      <Typography variant="h5">Game: {id + 1}</Typography>
      <div className={styles.card}>
        <div>
          <Typography>time 1</Typography>
          {game &&
            game.team1.map((hero) => (
              <Typography className={styles.nameTeam} key={hero.id}>
                {hero.name}
              </Typography>
            ))}
        </div>
        <div>
          <Typography>time 2</Typography>
          {game &&
            game.team2.map((hero) => (
              <Typography className={styles.nameTeam} key={hero.id}>
                {hero.name}
              </Typography>
            ))}
        </div>
      </div>
      <Typography>O MVP do combate foi: {game.mvp}</Typography>
      <Typography>O Time ganhador do combate foi: {game.winner}</Typography>
      <Typography>Combate simulado: {game.user}</Typography>
    </div>
  );
};

export default CardHistoric;
