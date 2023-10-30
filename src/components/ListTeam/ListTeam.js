// css
import styles from "./ListTeam.module.css";

// Mui Components
import { Button, Typography } from "@mui/material";

// recebe como props o time que esta selecionado, uma função para mudar o time selecionado, um array com os integrante de um time e o nome do time 
const ListTeam = ({ selectTeam, setSelectTeam, team, nameTeam }) => {
  return (
      <div className={styles.containerTeam}>
          {/* logica de seleção de time e botao */}
      {selectTeam === 1 && nameTeam === "TIME 1" && (
        <Button
          className={styles.select}
          variant="contained"
          onClick={() => setSelectTeam(0)}
        >
          Selecionar
        </Button>
      )}
      {selectTeam === 0 && nameTeam === "TIME 2" && (
        <Button
          className={styles.select}
          variant="contained"
          onClick={() => setSelectTeam(1)}
        >
          Selecionar
        </Button>
      )}
      {selectTeam === 0 && nameTeam === "TIME 1" && (
        <Button className={styles.outLine} variant="outlined">
          Selecionado
        </Button>
      )}
      {selectTeam === 1 && nameTeam === "TIME 2" && (
        <Button className={styles.outLine} variant="outlined">
          Selecionado
        </Button>
      )}
      <div className={styles.listTeam}>
        <Typography variant="h5">{nameTeam}</Typography>

              {/* Map para listar os personagens selecionados para o usuario */}
        {team &&
          team.map((hero) => (
            <div key={hero.id} className={styles.teams}>
              <img src={hero.images.lg}></img>
              <Typography variant="h6">{hero.name}</Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListTeam;
