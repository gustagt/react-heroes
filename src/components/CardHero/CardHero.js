// css
import styles from "./CardHero.module.css"

// import mui components
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// hooks react
import { useNavigate } from 'react-router-dom';

// recebe o heroi e o evento que é acionado ao clicar no card
const CardHero = ({hero, handleClickCard}) => {

  const navigate = useNavigate()

  // função que soma os poderes
  function sumPower(powerstats) {
    const sum = powerstats.combat +powerstats.durability +powerstats.intelligence +powerstats.power +powerstats.speed + powerstats.strength;
    return sum
  }
 

  return (
    <Card className={styles.card} sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => handleClickCard(hero)}>
        <CardMedia
          component="img"
          height="200"
          image={hero.images.lg}
          alt="green iguana"
        />
        <CardContent className={styles.card}>
          <Typography gutterBottom variant="h5" component="div">
            {hero.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <span>Powerstats:</span> {sumPower(hero.powerstats)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() =>navigate(`/info/${hero.id}`)}>
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardHero