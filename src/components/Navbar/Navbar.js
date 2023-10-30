// css
import styles from "./Navbar.module.css";

// mui componentes
import { Button, Typography, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// hooks react
import { useNavigate } from "react-router-dom";

// hooks personalizados
import { useUserContext } from "../../hooks/useUserContext";

const Navbar = ({ handleChangeSearch = null, handleClickLogout }) => {

  // recebendo o contexto pelo hook
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  // clique botão sair, limpa o state usuario e volta para o menu
  function handleClickLogout() {
    setUser("");
    navigate("/menu");
  }

  return (
    <div className={styles.containerNavbar}>
      <div className={styles.containerAvatar}>
        <Avatar className={styles.avatar} sx={{ bgcolor: deepOrange[500] }}>
          {user[0].toUpperCase()}
        </Avatar>
        <Typography variant="h6">{user.split(" ")[0]}</Typography>
      </div>
      {/* so aparece a barra de pesquisa se for necessario a pesquisa na pagina */}
      {handleChangeSearch && (
        <input
          type="search"
          onChange={handleChangeSearch}
          placeholder="Busque pelo nome (min 4 letras"
        ></input>
      )}

      {/* color: error (está somente pela estilização) */}
      <div className={styles.containerButton}>
        <Button
          onClick={handleClickLogout}
          variant="contained"
          color="error"
          endIcon={<ExitToAppIcon />}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
