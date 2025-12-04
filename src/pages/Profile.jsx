import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="container section">
      <h2>Profil</h2>
      {user ? (
        <div className="card">
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Rôle :</strong> {user.role}</p>
        </div>
      ) : <p>Utilisateur non connecté.</p>}
    </div>
  );
}
