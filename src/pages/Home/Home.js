import { useFetchHeroes } from "../../hooks/useFetchHeroes";
import styles from "./Home.module.css";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
// components
import CardHero from "../../components/CardHero";
import Typography from '@mui/material/Typography';


import { useHeroesContext } from "../../hooks/useHeroesContext"
import { useEffect } from "react";
import { Button, Container } from "@mui/material";
import { useState } from "react";

const Home = () => {

  
  const { data: heroesData} = useFetchHeroes();
  const { heroes , setHeroes } = useHeroesContext();

  useEffect(() => {
    setHeroes(heroesData)
    console.log(heroesData)
  },[heroes])




  const [team1, setTeam1] = useState([])
  const [team2, setTeam2] = useState([])

  const [selectTeam, setSelectTeam] = useState(0)

  const [winner, setWinner] = useState('')
  const [sumPowerStatsWinner, setSumPowerStatsWinner] = useState('')
  const [mvp, setMvp] = useState('')

  const [page, setPage] = useState(1)

  const [listHeroes, setListHeroes] = useState([])
  const [search, setSearch] = useState('')

  // fazer a paginação

  useEffect(() => {
    if(!heroes) return 
    function subListHeroes(){

      // Calcule o índice de início e fim para a página atual
      const inicio = (page - 1) * 12;
      const fim = inicio + 12;
  
      // Crie uma sub-lista usando slice() com base no índice de início e fim
      setListHeroes(heroes.slice(inicio, fim));
  
      // Agora você pode mapear a sub-lista
    }
    subListHeroes()
  }, [page, heroes])


  function handleClickSelectHero(hero) {

    if (selectTeam === 0) {
      if (team1.length === 3) {



        setTeam1((actualTeam) => {
          const newTeam = [...actualTeam]
          newTeam.push(hero)
          newTeam.shift()
          return newTeam
        })


      } else {

        setTeam1((actualTeam) => [
          ...actualTeam,
          hero
        ])
      }

    }
    if (selectTeam === 1) {
      if (team2.length === 3) {

        setTeam2((actualTeam) => {
          const newTeam = [...actualTeam]
          newTeam.push(hero)
          newTeam.shift()
          return newTeam
        })
      } else {
        setTeam2((actualTeam) => [

          ...actualTeam,
          hero
        ])

      }
    }
  }

  function handleClickReset() {
    setTeam1([])
    setTeam2([])
    setSelectTeam(0)
    setMvp('')
    setWinner('')
    setSumPowerStatsWinner('')
  }

  function handleChangeSearch(e) {
    setSearch(e.target.value)
    const list = heroes.filter(hero => hero.name.includes(search))
    const inicio = (page - 1) * 12;
    const fim = inicio + 12;

    // Crie uma sub-lista usando slice() com base no índice de início e fim
    setListHeroes(list.slice(inicio, fim));
  }
 

  useEffect(() => {
    function combat() {
      if (team1.length !== 3 || team2.length !== 3) return

      let winner = "Empate"
      let mvp = ""
      let sumTeam1 = 0
      let sumTeam2 = 0
      let sumPowerStats = 0

      function sumPower(powerstats) {
        const sum = powerstats.combat + powerstats.durability + powerstats.intelligence + powerstats.power + powerstats.speed + powerstats.strength;
        return sum
      }

      team1.forEach(hero => {
        const sum = sumPower(hero.powerstats)
        sumTeam1 += sum
        if (sumPowerStats < sum) {
          sumPowerStats = sum
          mvp = hero.name
        }
      });

      team2.forEach(hero => {
        const sum = sumPower(hero.powerstats)
        sumTeam2 += sum
        if (sumPowerStats < sum) {
          sumPowerStats = sum
          mvp = hero.name
        }
      });

      if (sumTeam1 > sumTeam2) {
        winner = "Time 1"
        setSumPowerStatsWinner(sumTeam1)
      }
      if (sumTeam1 < sumTeam2) {
        winner = "Time 2"
        setSumPowerStatsWinner(sumTeam2)
      }
      setMvp(mvp)
      setWinner(winner)

    }
    combat()
  }, [team1, team2])

  console.log(team2)

  return (
    <div>
      <div className={styles.containerNavbar}>
        <Avatar className={styles.avatar} sx={{ bgcolor: deepOrange[500] }}>user</Avatar>
        <input type="search" onChange={handleChangeSearch}></input>
        <Button>Sair</Button>
      </div>
      <div className={styles.containerMain}>


        <div className={styles.containerTeam1}>
          {selectTeam === 1 && (
            <Button variant="contained" onClick={() => setSelectTeam(0)}>Selecionar</Button>

          )}
          {selectTeam === 0 && (

            <Button variant="outlined">Selecionado</Button>

          )}
          <h3>TEAM 1</h3>
          {team1 && team1.map((hero) => (
            <div key={hero.id} className={styles.teams}>
              <img src={hero.images.xs}></img>
              <span>{hero.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.containerTeam2}>
          {selectTeam === 0 && (
            <Button variant="contained" onClick={() => setSelectTeam(1)}>Selecionar</Button>

          )}
          {selectTeam === 1 && (

            <Button variant="outlined">Selecionado</Button>

          )}
          <h3>TEAM 2</h3>
          {team2 && team2.map((hero) => (
            <div key={hero.id} className={styles.teams}>
              <span>{hero.name}</span>
              <img src={hero.images.xs}></img>
            </div>
          ))}
        </div>

        <div className={styles.containerCards}>
          {winner && (
            <div className={styles.messageWinner}>
              <p>O {winner} VENCEU O COMBATE COM INCRIVEIS {sumPowerStatsWinner} PONTOS DE PODER!</p>
              <p>Heroi com maior desempenho em batalha: {mvp}</p>
              <br></br>
              <span>PARABENS!!!</span>
              <br></br>
              <Button onClick={handleClickReset}>Reiniciar</Button>
            </div>
          )}


          {listHeroes && listHeroes.map((hero) => (

            <CardHero key={hero.id} hero={hero} handleClickCard={handleClickSelectHero}></CardHero>

          ))}


        </div>
      </div>
          {heroes && (<>
            <Typography>Page: {page}</Typography>
            <Pagination count={Math.ceil(heroes.length / 12)} page={page} onChange={(e, value) => setPage(value)} color="secondary" />
          </>
          )}
    </div>
  );
};

export default Home;
