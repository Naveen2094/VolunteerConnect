import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerVolunteer from "./assets/register-volunteer.png";
import AuthSplitLayout from "./components/AuthSplitLayout";
import SiteFooter from "./components/SiteFooter";
import SiteNavbar from "./components/SiteNavbar";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1">
        <AuthSplitLayout
          image={registerVolunteer}
          imageClassName="register-image"
          title="Join VolunteerConnect"
          subtitle="Sign up to discover volunteer roles, internship opportunities, and verified community programs."
        >
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control site-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="text"
                className="form-control site-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control site-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary site-button w-100 mt-3">
              Register
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="muted-text">Already have an account? </span>
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </div>
        </AuthSplitLayout>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Register;
