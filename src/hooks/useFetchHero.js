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

//       setLoading(true);

//       const collectionRef = await collection(db, docCollection);

//       try {
//         let q;

//         if (search) {
//           q = await query(
//             collectionRef,
//             where("tags", "array-contains", search),
//             orderBy("createdAt", "desc")
//           );
//         } else if (uid) {
//           q = await query(
//             collectionRef,
//             where("uid", "==", uid),
//             orderBy("createdAt", "desc")
//           );
//         } else {
//           q = await query(collectionRef, orderBy("createdAt", "desc"));
//         }

//         await onSnapshot(q, (querySnapshot) => {
//           setDocuments(
//             querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }))
//           );
//         });
//       } catch (error) {
//         console.log(error);
//         setError(error.message);
//       }

//       setLoading(false);
//     }

//     loadData();
//   }, [docCollection, search, uid, cancelled]);

//   console.log(documents);

//   useEffect(() => {
//     return () => setCancelled(true);
//   }, []);
