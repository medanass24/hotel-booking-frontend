import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUserFriends, FaRegMoneyBillAlt, FaStar } from "react-icons/fa";

export default function SearchBar({ defaultCity = "" }) {
  const [city, setCity] = useState(defaultCity);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort] = useState("relevance");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (guests) params.set("guests", guests);
    if (priceMin) params.set("price_min", priceMin);
    if (priceMax) params.set("price_max", priceMax);
    if (minRating) params.set("rating_min", minRating);
    if (sort) params.set("sort", sort);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:10}}>
      <div className="searchbox" style={{alignItems:"center"}}>
        <input placeholder="Ville (ex: Marrakech, Casablanca)" value={city} onChange={e => setCity(e.target.value)} style={{minWidth:220}} />
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} />
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <FaUserFriends color="white" />
          <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} style={{width:60}} />
        </div>
        <button type="submit"><FaSearch /> &nbsp;Rechercher</button>
      </div>

      <div className="filters" style={{alignItems:"center"}}>
        <div className="filter-pill">
          <FaRegMoneyBillAlt />
          <input placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} style={{width:80, background:"transparent",border:0,color:"#fff"}} />
          <span style={{opacity:.7}}>-</span>
          <input placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} style={{width:80, background:"transparent",border:0,color:"#fff"}} />
        </div>

        <div className="filter-pill">
          <FaStar />
          <select value={minRating} onChange={e => setMinRating(e.target.value)} style={{background:"transparent",border:0,color:"#fff"}}>
            <option value="">Note min</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
          </select>
        </div>

        <div className="filter-pill">
          Trier
          <select value={sort} onChange={e => setSort(e.target.value)} style={{background:"transparent",border:0}}>
            <option value="relevance">Pertinence</option>
            <option value="price_asc">Prix (croissant)</option>
            <option value="price_desc">Prix (décroissant)</option>
            <option value="rating_desc">Note (décroissant)</option>
          </select>
        </div>

        <div style={{marginLeft:"auto"}}>
          <button type="submit" className="btn btn-primary">Appliquer</button>
        </div>
      </div>
    </form>
  );
}
