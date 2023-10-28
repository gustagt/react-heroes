import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import styles from "./CardHero.module.css"
const CardHero = ({hero, handleClickCard}) => {

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
        <Button size="small" color="primary">
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardHero