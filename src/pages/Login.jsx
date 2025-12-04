import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import sample2 from "../assets/sample2.jpg";

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [payload, setPayload] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const validate = () => {
    if (!payload.email || !payload.password) {
      setError("Tous les champs sont requis.");
      return false;
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(payload.email)) {
      setError("Adresse email invalide.");
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
      await login(payload);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Erreur lors de la connexion. Vérifie tes identifiants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{maxWidth:920, paddingTop:36}}>
      <div className="auth-grid">
        <motion.div className="auth-art" initial="hidden" animate="visible" variants={cardVariant}>
          <h2>Bienvenue</h2>
          <p>Connecte-toi pour gérer tes réservations et profiter des meilleures offres.</p>
          <div className="art-images">
            <motion.img src={sample2} alt="hotel" initial={{ scale:0.98, opacity:0.9 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.8 }} style={{width:"100%", borderRadius:12}} />
          </div>
        </motion.div>

        <motion.div className="auth-card" initial="hidden" animate="visible" variants={cardVariant}>
          <h3>Connexion</h3>
          <form onSubmit={submit} className="auth-form" noValidate>
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
                  placeholder="Ton mot de passe"
                  required
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="password-toggle">
                  {showPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            {error && <div className="form-error">{error}</div>}

            <div style={{display:"flex",gap:12,alignItems:"center",marginTop:8}}>
              <motion.button whileTap={{ scale: 0.98 }} className="btn btn-primary" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </motion.button>
              <Link to="/register" className="btn btn-ghost" style={{textDecoration:"none"}}>Créer un compte</Link>
            </div>

            <p style={{marginTop:12,fontSize:14,color:"#6b7280"}}>
              Mot de passe oublié ? <button type="button" className="btn-link" onClick={()=>alert("Fonctionnalité à implémenter")} style={{padding:0}}>Réinitialiser</button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
