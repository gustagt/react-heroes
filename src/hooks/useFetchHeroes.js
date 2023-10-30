import { useState, useEffect } from "react";

export function useFetchHeroes() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          "http://homologacao3.azapfy.com.br/api/ps/metahumans"
        );
        const dataReturn = await response.json();
        setData(dataReturn);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
      
    }
    loadData();
  }, [cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  
    
  return { data, loading, error };
}