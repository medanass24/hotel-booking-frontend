import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import HotelDetail from "./pages/HotelDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Reservations from "./pages/Reservations";
import ManagerDashboard from "./pages/ManagerDashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/manager" element={<ManagerDashboard />} />
          </Route>

          <Route path="*" element={<h2>Page non trouvée</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
