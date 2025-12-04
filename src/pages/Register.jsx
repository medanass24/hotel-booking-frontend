import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import sample1 from "../assets/sample1.jpg";

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [payload, setPayload] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const validate = () => {
    if (!payload.name || !payload.email || !payload.password) {
      setError("Tous les champs sont requis.");
      return false;
    }
    if (payload.name.length < 2) {
      setError("Le nom est trop court.");
      return false;
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(payload.email)) {
      setError("Adresse email invalide.");
      return false;
    }
    if (payload.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      await register(payload);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{maxWidth:920, paddingTop:36}}>
      <div className="auth-grid">
        <motion.div className="auth-art" initial="hidden" animate="visible" variants={cardVariant}>
          <h2>Rejoins-nous</h2>
          <p>Crée un compte pour gérer tes réservations, laisser des avis et accéder à des offres exclusives.</p>
          <div className="art-images">
            <motion.img src={sample1} alt="room" initial={{ scale:0.98 }} animate={{ scale:1 }} transition={{ duration:0.8 }} style={{width:"100%", borderRadius:12}} />
          </div>
        </motion.div>

        <motion.div className="auth-card" initial="hidden" animate="visible" variants={cardVariant}>
          <h3>Inscription</h3>
          <form onSubmit={submit} className="auth-form" noValidate>
            <label className="input-label">
              <span className="label-row"><FaUser /> <span>Nom complet</span></span>
              <input
                type="text"
                value={payload.name}
                onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                placeholder="Ex: Anass Med"
                required
              />
            </label>

            <label className="input-label">
              <span className="label-row"><FaEnvelope /> <span>Email</span></span>
              <input
                type="email"
                value={payload.email}
                onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                placeholder="ex: anass@example.com"
                required
              />
            </label>

            <label className="input-label">
              <span className="label-row"><FaLock /> <span>Mot de passe</span></span>
              <div style={{position:"relative"}}>
                <input
                  type={showPwd ? "text" : "password"}
                  value={payload.password}
                  onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                  placeholder="6 caractères minimum"
                  required
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="password-toggle">
                  {showPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            {error && <div className="form-error">{error}</div>}

            <div style={{display:"flex",gap:12,alignItems:"center",marginTop:8}}>
              <motion.button whileTap={{ scale: 0.98 }} className="btn btn-primary" disabled={loading}>{loading ? "Inscription..." : "S'inscrire"}</motion.button>
              <button type="button" onClick={() => navigate("/login")} className="btn btn-ghost">Connexion</button>
            </div>

            <p style={{marginTop:12,fontSize:14,color:"#6b7280"}}>
              En créant un compte, tu acceptes nos <button type="button" className="btn-link" onClick={()=>alert("Affiche les CGU")}>Conditions</button>.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
