import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import VaccinationCenters from "./VaccinationCenters";
import ApplySlot from "./ApplySlot";
import SearchCenter from "./SearchCenter";
import NavBar from "./NavBar";
import GetDosageDetails from "./GetDosageDetails";
import RemoveCenter from "./RemoveCenter";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  // useEffect(() => {
  //   const fetchCsrfToken = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/csrf/");
  //       const csrfToken = response.data.csrfToken;
  //       setCsrfToken(csrfToken);
  //     } catch (error) {
  //       console.error("Fetch CSRF token error:", error);
  //     }
  //   };
  //   fetchCsrfToken();
  // }, []);

  return (
    <Router>
      <div>
        <NavBar loggedIn={!!user} isAdmin={isAdmin} onLogout={handleLogout} />
        <h1>COVID Vaccination Booking</h1>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                {user ? (
                  <VaccinationCenters user={user} isAdmin={isAdmin} />
                ) : (
                  <LoginForm
                    setUser={setUser}
                    setIsAdmin={setIsAdmin}
                    csrfToken={csrfToken}
                  />
                )}
              </>
            }
          />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/user/applySlot"
            element={user && !isAdmin && <ApplySlot user={user} />}
          />
          <Route
            path="/user/searchCenter"
            element={user && !isAdmin && <SearchCenter />}
          />

          <Route
            path="/admin/getDosageDetails"
            element={user && isAdmin && <GetDosageDetails />}
          />
          <Route
            path="/admin/removeCenter"
            element={user && isAdmin && <RemoveCenter />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
