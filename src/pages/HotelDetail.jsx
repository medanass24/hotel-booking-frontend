import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ImageGallery from "../components/ImageGallery";
import BookingForm from "../components/BookingForm";

export default function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/hotels/${id}`);
        setHotel(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [id]);

  if (!hotel) return <div className="container">Chargement...</div>;

  return (
    <div className="container section">
      <h1>{hotel.name}</h1>
      <p className="muted">{hotel.address} — {hotel.city}</p>
      <ImageGallery images={hotel.images || []} />
      <div className="two-col">
        <div>
          <h3>Description</h3>
          <p>{hotel.description}</p>

          <h3>Chambres</h3>
          {hotel.rooms?.length ? hotel.rooms.map(room => (
            <div className="room" key={room.id}>
              <h4>{room.title} — {room.price_per_night} MAD / nuit</h4>
              <p>Capacité: {room.capacity}</p>
              <BookingForm roomId={room.id} onBooked={(r) => alert("Réservé !")} />
            </div>
          )) : <p>Aucune chambre listée.</p>}
        </div>

        <aside>
          <h3>Infos</h3>
          <p>Catégorie: {hotel.category}</p>
          <p>Services: {hotel.amenities?.join(", ")}</p>
        </aside>
      </div>
    </div>
  );
}
