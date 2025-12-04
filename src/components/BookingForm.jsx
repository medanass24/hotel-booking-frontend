import React, { useState } from "react";
import api from "../services/api";

export default function BookingForm({ roomId, onBooked }) {
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/reservations", {
        room_id: roomId,
        start_date: dates.start_date,
        end_date: dates.end_date,
        guests,
      });
      onBooked && onBooked(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={submit}>
      <label>
        Début
        <input type="date" value={dates.start_date} onChange={e => setDates({...dates, start_date: e.target.value})} required />
      </label>
      <label>
        Fin
        <input type="date" value={dates.end_date} onChange={e => setDates({...dates, end_date: e.target.value})} required />
      </label>
      <label>
        Personnes
        <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} />
      </label>
      <button disabled={loading}>{loading ? "Réservation..." : "Réserver"}</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
