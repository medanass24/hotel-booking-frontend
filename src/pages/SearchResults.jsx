import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import HotelCard from "../components/HotelCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const city = query.get("city") || "";
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = { city };
        const res = await api.get("/hotels", { params });
        setHotels(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]);

  return (
    <div className="container section">
      <h2>Résultats {city ? `pour "${city}"` : ""}</h2>
      {loading ? <p>Chargement...</p> :
        hotels.length ? <div className="grid">{hotels.map(h => <HotelCard key={h.id} hotel={h} />)}</div>
        : <p>Aucun hôtel trouvé.</p>
      }
    </div>
  );
}
