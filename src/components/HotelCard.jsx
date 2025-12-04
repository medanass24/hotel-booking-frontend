import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWifi, FaParking, FaUtensils, FaSwimmer } from "react-icons/fa";
import sample1 from "../assets/sample1.jpg";

  

function IconFor(name){
  if(!name) return <FaWifi />;
  const key = name.toLowerCase();
  if(key.includes("wifi")) return <FaWifi />;
  if(key.includes("parking")) return <FaParking />;
  if(key.includes("restaurant") || key.includes("food")) return <FaUtensils />;
  if(key.includes("pool") || key.includes("piscine")) return <FaSwimmer />;
  return <FaWifi />;
}

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function HotelCard({ hotel }) {
  const thumb = hotel?.thumbnail || sample1;
  const amenities = hotel?.amenities || ["Wifi","Parking","Petit-déj"];

  return (
    <motion.article
      className="hotel-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.995 }}
      layout
    >
      <div className="thumb">
        <img src={thumb} alt={hotel?.name || "Hotel"} loading="lazy" />
      </div>

      <div className="hotel-card-body">
        <h3><Link to={`/hotels/${hotel?.id || ""}`}>{hotel?.name || "Hotel Example"}</Link></h3>
        <p className="muted">{hotel?.city || "Ville"} • {hotel?.category || "Auberge"}</p>
        <p className="muted" style={{fontSize:".95rem"}}>{(hotel?.short_description || "Belle adresse confortable et bien notée.").slice(0,110)}</p>

        <div className="amenities">
          {amenities.slice(0,4).map((a,i) => (
            <span key={i} className="amenity">{IconFor(a)} {a}</span>
          ))}
        </div>

        <div className="hotel-meta">
          <span className="badge-rating">{hotel?.avg_rating ? `⭐ ${hotel.avg_rating}` : "—"}</span>
          <span style={{display:"flex",gap:8,alignItems:"center"}}>
            <span className="price">{hotel?.starting_price ? `${hotel.starting_price} MAD` : "À partir de —"}</span>
            <Link to={`/hotels/${hotel?.id || ""}`} className="btn btn-ghost" style={{marginLeft:8}}>Voir</Link>
          </span>
        </div>
      </div>
    </motion.article>
  );
}
