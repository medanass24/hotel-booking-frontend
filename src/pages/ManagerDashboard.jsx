import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ManagerDashboard() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/manager/hotels");
        setHotels(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="container section">
      <h2>Dashboard gérant</h2>
      <p>Gérer vos établissements</p>
      {hotels.length ? hotels.map(h => (
        <div className="card" key={h.id}>
          <h3>{h.name}</h3>
          <p>{h.city}</p>
        </div>
      )) : <p>Chargement ou aucun hôtel</p>}
    </div>
  );
}
