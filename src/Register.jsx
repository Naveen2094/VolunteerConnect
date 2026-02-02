import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, phone, password }),
        }
      );

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
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 text-white"
      style={{
        background:
          'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url("https://st4.depositphotos.com/16122460/29031/i/450/depositphotos_290310662-stock-photo-team-of-volunteers-in-uniform.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: 'Inter, "Noto Sans", sans-serif',
      }}
    >
      <div
        className="bg-dark border border-secondary rounded-4 p-4 shadow-lg"
        style={{ width: "420px" }}
      >
        <h2 className="text-center fw-bold mb-2">Create Account</h2>
        <p className="text-center text-secondary mb-4">
          Join VolunteerConnect and make a difference
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-light">Full Name</label>
            <input
              type="text"
              className="form-control bg-secondary text-white border-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Phone Number</label>
            <input
              type="text"
              className="form-control bg-secondary text-white border-0"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control bg-secondary text-white border-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold mt-2">
            Register
          </button>
          </form>

        <div className="text-center mt-3">
          <span className="text-secondary">Already have an account?</span>{" "}
          <Link to="/login" className="text-info text-decoration-none fw-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
