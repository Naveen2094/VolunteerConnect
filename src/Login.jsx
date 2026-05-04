import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginVolunteer from "./assets/login-volunteer.jpg";
import AuthSplitLayout from "./components/AuthSplitLayout";
import SiteFooter from "./components/SiteFooter";
import SiteNavbar from "./components/SiteNavbar";

const Login = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("phone", data.user.phone);
      localStorage.setItem("role", data.user.role);

      alert("Login successful");
      navigate("/");
    } catch (loginError) {
      console.error("Login error:", loginError);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1">
        <AuthSplitLayout
          image={loginVolunteer}
          imageClassName="login-image"
          title="Login to continue"
          subtitle="Access verified programs, manage applications, and keep track of your activity."
          quote='"The best way to find yourself is to lose yourself in the service of others."'
          quoteAuthor="- Mahatma Gandhi"
        >
          {error && <div className="alert alert-danger rounded-4">{error}</div>}

          <form onSubmit={handleLogin}>
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
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="muted-text">New user? </span>
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </div>
        </AuthSplitLayout>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Login;
