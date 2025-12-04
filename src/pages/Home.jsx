// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import HotelCard from "../components/HotelCard";
import api from "../services/api";
import { motion } from "framer-motion";

// imports locaux
import room1 from "../assets/room1.jpg";
import room2 from "../assets/room2.jpg";
import acc1 from "../assets/acc1.jpg";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/hotels?popular=1&limit=8");
        setHotels(res.data);
      } catch (e) {
        console.warn("API hotels failed, using mock");
        setHotels([
          { id:1, name:"Riad Soleil", city:"Marrakech", category:"Riad", avg_rating:4.6, starting_price:420, thumbnail: room1, amenities:["Wifi","Parking","Piscine"], short_description: "Un lieu luxueux avec une vue panoramique." },
          { id:2, name:"Hotel Bleu", city:"Casablanca", category:"Hôtel de Luxe", avg_rating:4.2, starting_price:320, thumbnail: room2, amenities:["Wifi","Petit-déj"], short_description: "Confort moderne au cœur de la ville." },
          { id:3, name:"Hotel Douce", city:"Tanger", category:"Hotel 5*", avg_rating:4.8, starting_price:260, thumbnail: acc1, amenities:["Wifi","Restaurant"], short_description: "Expérience authentique et chaleureuse." },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>

      {/* HERO */}
      <section className="hero container">
        <div className="hero-inner">
          <div style={{ maxWidth: 700 }}>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Trouve l'hôtel parfait — facile, rapide et sécurisé
            </motion.h1>

            <p>Recherche par ville, date, nombre de personnes. Compare les avis et réserve en quelques clics.</p>

            <div style={{ marginTop: 18 }}>
              <SearchBar defaultCity="" />
            </div>
          </div>

          <div style={{ minWidth: 320, display: "flex", justifyContent: "flex-end" }}>
            <div className="offer-box">
              <strong>Offres du moment</strong>
              <div>Réservez maintenant et bénéficiez de -20% sur certaines dates.</div>

              <div className="btn-row">
                <button className="btn btn-primary">Voir les offres</button>
                <button className="btn btn-ghost">En savoir plus</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION POPULAIRES */}
      <section className="container section">
        <h2>Hôtels populaires</h2>

        <motion.div className="grid"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="hotel-card skeleton">
                <div className="thumb"></div>
                <div className="hotel-card-body">
                  <div className="skeleton-line"></div>
                </div>
              </div>
            ))
          ) : (
            hotels.map(h => <HotelCard key={h.id} hotel={h} />)
          )}
        </motion.div>
      </section>

      {/* SECTION POURQUOI NOUS CHOISIR */}
      <section className="container section why-us">
        <h2>Pourquoi réserver avec nous ?</h2>

        <div className="why-grid">
          <div>
            <h3>🔒 Paiement sécurisé</h3>
            <p>Vos transactions sont protégées avec un cryptage bancaire avancé.</p>
          </div>
          <div>
            <h3>⭐ Avis vérifiés</h3>
            <p>Chaque avis provient d'un client réel, pour garantir la transparence.</p>
          </div>
          <div>
            <h3>💬 Support 24/7</h3>
            <p>Une question ? Notre équipe vous accompagne à toute heure.</p>
          </div>
        </div>
      </section>

      {/* SECTION CATÉGORIES */}
      <section className="container section">
        <h2>Nos catégories d'hôtels</h2>

        <div className="category-grid">
          <div className="category-card">🏨 Hôtels Luxe</div>
          <div className="category-card">🏡 Riads & Maisons d’hôtes</div>
          <div className="category-card">🌊 Vue sur mer</div>
          <div className="category-card">🌿 Éco-lodges</div>
        </div>
      </section>

      {/* SECTION AVIS CLIENTS */}
      <section className="section testimonials">
        <div className="container">
          <h2>Ce que disent nos clients</h2>

          <div className="testi-grid">
            <div className="testi-card">
              “Excellent service, réservation rapide et hôtels de qualité !”
              <strong>— Yassine, Rabat</strong>
            </div>

            <div className="testi-card">
              “J’ai trouvé un riad magnifique à Marrakech. Très satisfait !”
              <strong>— Sarah, Paris</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION NEWSLETTER / CTA */}
      <section className="cta-section">
        <div className="container cta-box">
          <h2>Recevez les meilleures offres avant tout le monde</h2>
          <p>Abonnez-vous à notre newsletter et gagnez jusqu’à 30% sur certains séjours.</p>

          <div className="newsletter-row">
            <input type="email" placeholder="Votre email" />
            <button className="btn btn-primary">S’abonner</button>
          </div>
        </div>
      </section>

    </div>
  );
}
