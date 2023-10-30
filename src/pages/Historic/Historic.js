// css
import styles from "./Historic.module.css";

// Mui Components
import { Button, Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// hooks react
import { useNavigate } from "react-router-dom";
// hooks personalizados
import { useHistoricContext } from "../../hooks/useHistoricContext";

// components
import CardHistoric from "../../components/CardHistoric/CardHistoric";
import Copyright from "../../components/Copyright/Copyright";

const Historic = () => {
  // recebe a lista de historico pelo contexto
  const { historic } = useHistoricContext();

  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.containerTop}>
        <Button
          variant="contained"
          color="error"
          endIcon={<SendIcon />}
          onClick={() => navigate("/menu")}
        >
          Voltar
        </Button>
      </div>
      <div className="center">
        <div className={styles.card}>
          {/* gera todo o historico */}
          {historic &&
            historic.map((game, id) => (
              <>
                <CardHistoric key={id} game={game} id={id}></CardHistoric>
                <Divider></Divider>
              </>
            ))}
          <Copyright></Copyright>
        </div>
      </div>
    </div>
  );
};

export default Historic;
