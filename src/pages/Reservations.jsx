import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Reservations() {
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/users/me/reservations");
        setReservations(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="container section">
      <h2>Mes réservations</h2>
      {!reservations ? <p>Chargement...</p> : (
        reservations.length ? reservations.map(r => (
          <div className="card" key={r.id}>
            <p><strong>Hôtel:</strong> {r.hotel_name}</p>
            <p>{r.start_date} → {r.end_date}</p>
            <p>Status: {r.status}</p>
          </div>
        )) : <p>Aucune réservation</p>
      )}
    </div>
  );
}
