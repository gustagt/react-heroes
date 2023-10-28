import { useFetchHeroes } from "../hooks/useFetchHero";
import styles from "./Home.module.css";
import Button from "@mui/material/Button";
// components
import Card from "../components/Card";

const Home = () => {
  const { data: heroes } = useFetchHeroes();

  return (
    <div>
      <Card></Card>
      <Button>dsadsa</Button>
    </div>
  );
};

export default Home;
