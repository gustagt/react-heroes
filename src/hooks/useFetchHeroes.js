// hooks react
import { useState, useEffect } from "react";

export function useFetchHeroes() {
  // state dos dados recebido do fetch
  const [data, setData] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    // função para carregar os dados
    async function loadData() {
      // para evitar vazamento de memoria
      if (cancelled) {
        return;
      }

      try {
        // resposta da requisição
        const response = await fetch(
          "http://homologacao3.azapfy.com.br/api/ps/metahumans"
        );
        // convertendo o json em objeto
        const dataReturn = await response.json();
        // setando os dados no state
        setData(dataReturn);
      } catch (error) {
        // feedback em caso de erro
        console.log(error);
      }
    }
    loadData();
  }, [cancelled]);

  // para evitar vazamento de memoria
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { data };
}
