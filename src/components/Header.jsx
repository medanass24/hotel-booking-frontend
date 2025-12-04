import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaSignInAlt } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <div className="logo">HB</div>
          <div>HotelBook</div>
        </Link>

        <nav>
          <Link to="/search">Rechercher</Link>
          {user ? (
            <>
              <Link to="/reservations">Mes réservations</Link>
              {user.role === "manager" && <Link to="/manager">Dashboard</Link>}
              <Link to="/profile"><FaUser style={{verticalAlign:'middle'}}/> Profil</Link>
              <button className="btn-link" onClick={logout}><FaSignInAlt style={{transform:'rotate(180deg)'}}/> Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login">Connexion</Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
