// css
import styles from "./Home.module.css";

// hooks react
import { useEffect, useState } from "react";

// hooks personalizados
import { useHistoricContext } from "../../hooks/useHistoricContext";
import { useUserContext } from "../../hooks/useUserContext";
import { useHeroesContext } from "../../hooks/useHeroesContext";
import { useFetchHeroes } from "../../hooks/useFetchHeroes";
// components
import CardHero from "../../components/CardHero/CardHero";
import Copyright from "../../components/Copyright/Copyright";
import Navbar from "../../components/Navbar/Navbar";
import ListTeam from "../../components/ListTeam/ListTeam";
// Mui Components
import { Button, Pagination, Typography } from "@mui/material";

const Home = () => {
  // faz a requisção para obter a lista
  const { data: heroesData } = useFetchHeroes();

  // contexts
  const { heroes, setHeroes } = useHeroesContext();
  const { historic, setHistoric } = useHistoricContext();
  const { user } = useUserContext();

  // pega os dados da requisição e armazena no context
  useEffect(() => {
    setHeroes(heroesData);
  }, [heroesData]);

  // criação dos states necessarios
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const [selectTeam, setSelectTeam] = useState(0);

  const [winner, setWinner] = useState("");
  const [sumPowerStatsWinner, setSumPowerStatsWinner] = useState("");
  const [mvp, setMvp] = useState("");

  const [page, setPage] = useState(1);

  const [listHeroes, setListHeroes] = useState([]);
  const [search, setSearch] = useState("");

  // instancia a paginação dos cards de herois
  useEffect(() => {
    if (!heroes) return;
    function subListHeroes() {
      // Calcule o índice de início e fim para a página atual
      const inicio = (page - 1) * 12;
      const fim = inicio + 12;

      // Crie uma sub-lista usando slice() com base no índice de início e fim
      setListHeroes(heroes.slice(inicio, fim));
      console.log(heroes);
      // Agora você pode mapear a sub-lista
    }
    subListHeroes();
  }, [page, heroes]);

  // funcionalidade de seleção de heroi para cada time
  function handleClickSelectHero(hero) {
    if (selectTeam === 0) {
      if (team1.includes(hero)) return;
      if (team1.length === 3) {
        setTeam1((actualTeam) => {
          const newTeam = [...actualTeam];
          newTeam.push(hero);
          newTeam.shift();
          return newTeam;
        });
      } else {
        setTeam1((actualTeam) => [...actualTeam, hero]);
      }
    }
    if (selectTeam === 1) {
      if (team2.includes(hero)) return;
      if (team2.length === 3) {
        setTeam2((actualTeam) => {
          const newTeam = [...actualTeam];
          newTeam.push(hero);
          newTeam.shift();
          return newTeam;
        });
      } else {
        setTeam2((actualTeam) => [...actualTeam, hero]);
      }
    }
  }

  // fecha a mensagem o 
  function handleClickCloseMessage() {
 
    setWinner("");
    
  }

  // handle da pesquisa de herois
  function handleChangeSearch(e) {
    setSearch(e.target.value);
    // somente após 3 letras vai funcionar o filtro
    if (search.length < 3) return;
    const list = heroes.filter((hero) => hero.name.includes(search));
    // Crie uma sub-lista usando slice() com base no índice de início e fim
    setListHeroes(list);
  }

  // executa a função de combat e armazenamento da batalha no historico
  useEffect(() => {
    if (team1.length !== 3 || team2.length !== 3) return;
    let winner = "Empate";
    let mvp = "";
    // função combat
    function combat() {
      let sumTeam1 = 0;
      let sumTeam2 = 0;
      let sumPowerStats = 0;

      function sumPower(powerstats) {
        const sum =
          powerstats.combat +
          powerstats.durability +
          powerstats.intelligence +
          powerstats.power +
          powerstats.speed +
          powerstats.strength;
        return sum;
      }

      team1.forEach((hero) => {
        const sum = sumPower(hero.powerstats);
        sumTeam1 += sum;
        if (sumPowerStats < sum) {
          sumPowerStats = sum;
          mvp = hero.name;
        }
      });

      team2.forEach((hero) => {
        const sum = sumPower(hero.powerstats);
        sumTeam2 += sum;
        if (sumPowerStats < sum) {
          sumPowerStats = sum;
          mvp = hero.name;
        }
      });

      if (sumTeam1 > sumTeam2) {
        winner = "Time 1";
        setSumPowerStatsWinner(sumTeam1);
      }
      if (sumTeam1 < sumTeam2) {
        winner = "Time 2";
        setSumPowerStatsWinner(sumTeam2);
      }
      setMvp(mvp);
      setWinner(winner);

      setTeam1([]);
      setTeam2([]);
    }
    // função para salvar no historico
    function saveHistoric() {
      setHistoric([
        ...historic,
        {
          team1,
          team2,
          winner,
          mvp,
          user,
        },
      ]);
    }

    // executa as funçoes e salva o historico no local storage
    combat();
    saveHistoric();
    localStorage.setItem("historic", JSON.stringify(historic));
  }, [team1, team2]);

  return (
    <div>
      {/* navbar */}
      <Navbar handleChangeSearch={handleChangeSearch}></Navbar>
      <div className={styles.containerMain}>
        {/* lista de herois selecionados */}
        <div className={`${styles.containerTeam} center`}>
          <ListTeam
            selectTeam={selectTeam}
            setSelectTeam={setSelectTeam}
            team={team1}
            nameTeam="TIME 1"
          />
        </div>
        <div className={`${styles.containerTeam2} center`}>
          <ListTeam
            className={styles.containerTeam2}
            selectTeam={selectTeam}
            setSelectTeam={setSelectTeam}
            team={team2}
            nameTeam="TIME 2"
          />
        </div>

        <div className={styles.containerCards}>
          {/* mensagem de vitoria */}
          {winner && (
            <div className={styles.messageWinner}>
              <Typography variant="h6">
                O {winner} VENCEU O COMBATE COM INCRIVEIS {sumPowerStatsWinner}{" "}
                PONTOS DE PODER!
              </Typography>
              <Typography variant="subtitle1">
                Heroi com maior desempenho em batalha: <span>{mvp}</span>
              </Typography>
              <br></br>
              <Typography variant="subtitle1">PARABENS!!!</Typography>
              <br></br>
              <Button onClick={handleClickCloseMessage}>Fechar</Button>
            </div>
          )}

          {/* lista de herois */}
          {listHeroes &&
            listHeroes.map((hero) => (
              <CardHero
                key={hero.id}
                hero={hero}
                handleClickCard={handleClickSelectHero}
              ></CardHero>
            ))}
        </div>
      </div>
      {/* paginação */}
      {heroes && (
        <div className={styles.containerBottom}>
          <div className={styles.pagination}>
            <Typography>Page: {page}</Typography>
            <Pagination
              count={Math.ceil(heroes.length / 12)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="secondary"
            />
          </div>
          <Copyright></Copyright>
        </div>
      )}
    </div>
  );
};

export default Home;
