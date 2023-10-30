// Mui Components
import {
  Button,
  TextField,
  CssBaseline,
  Paper,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// hooks personalizados
import { useUserContext } from "../../hooks/useUserContext";
// hooks react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// componets
import Copyright from "../../components/Copyright/Copyright";


const defaultTheme = createTheme();

const Login = () => {
  // context
  const { setUser } = useUserContext();
  // states
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  // pega os dados do formulario e acessa a aplicação
  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("name")) {
      setError("Digite um nome de usuário para entrar no game");
      return;
    }
    setUser(data.get("name"));
    navigate("/home");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/13019931/pexels-photo-13019931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              REACT - HERO
            </Typography>
            {error && (
              <div className="message">
                <p>{error}</p>
              </div>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Digite um nome de usuário"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/historic")}
              >
                Historico
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
