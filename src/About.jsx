import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Link, useLocation } from "react-router-dom";

const About = () => {
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      {/* Header */}
      {/* NAVBAR */}
<header className="border-bottom border-secondary bg-dark">
  <nav className="navbar navbar-expand-md navbar-dark container px-3">
    {/* Brand */}
    <Link to="/" className="navbar-brand fw-bold fs-4 text-white">
      VolunteerConnect
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav align-items-center gap-md-3">
        {/* Common Links */}
        <li className="nav-item">
          <Link className="nav-link text-white fw-medium" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white fw-medium" to="/programs">
            Programs
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white fw-medium" to="/contact">
            Contact
          </Link>
        </li>

        {/* AUTH SECTION */}
        {!localStorage.getItem("role") && (
          <>
            <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/login">
                <i className="bi bi-person-circle me-1"></i>
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/register">
                <i className="bi bi-person-plus me-1"></i>
                Register
              </Link>
            </li>
          </>
        )}

        {localStorage.getItem("role") && (
          <>
            <li className="nav-item d-flex align-items-center text-white fw-medium">
              <i className="bi bi-person-check me-2"></i>
              {localStorage.getItem("name")}
              {localStorage.getItem("role") === "admin" && (
                <span className="badge bg-danger ms-2">ADMIN</span>
              )}
            </li>

            <li className="nav-item">
              <button
                className="btn btn-outline-light fw-bold px-3"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
</header>

      {/* Hero Section */}
      <main
        id="about"
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center px-3 py-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "480px",
        }}
      >
        <div className="text-center text-white" style={{ maxWidth: "720px" }}>
          <h1 className="display-5 fw-bold mb-3">About VolunteerConnect</h1>
          <p className="lead mb-4">
            VolunteerConnect is dedicated to connecting passionate individuals with
            impactful volunteer and internship opportunities to foster personal
            growth and community development.
          </p>
          <button
            className="btn btn-primary btn-lg px-5"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Show Less" : "Learn More"}
          </button>

          {showDetails && (
            <div className="mt-4 text-start bg-secondary bg-opacity-50 rounded p-4" style={{ maxWidth: 720 }}>
              <h3>Our Story</h3>
              <p>
                Founded in 2023, VolunteerConnect has helped thousands of volunteers
                find meaningful work and make a lasting impact worldwide. We believe
                in empowering individuals to take action and grow through service.
              </p>
              <h3>What We Offer</h3>
              <ul>
                <li>Personalized volunteer matching</li>
                <li>Skill development workshops</li>
                <li>Networking with community leaders</li>
                <li>Ongoing support and mentorship</li>
              </ul>
              <h3>Join Us</h3>
              <p>
                Become a part of a growing community that values empathy, action,
                and sustainable change. Together, we can make the world better, one
                volunteer at a time.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* About Section */}
      <section className="container py-5">
        <div className="mb-4 text-center mx-auto" style={{ maxWidth: 720 }}>
          <h2 className="fw-bold fs-2">Our Mission & Vision</h2>
          <p>
            We strive to create meaningful experiences that empower volunteers to
            create lasting change in their communities while growing their own skills
            and networks.
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              title: "Empowering Communities",
              text: "We collaborate with NGOs and organizations to empower local communities through hands-on projects and initiatives.",
              icon: "🤲",
            },
            {
              title: "Connecting Volunteers",
              text: "Our platform connects motivated volunteers with causes they care about to maximize impact.",
              icon: "🔗",
            },
            {
              title: "Sustainable Impact",
              text: "We focus on long-term sustainability and growth, ensuring our efforts make a real difference.",
              icon: "🌱",
            },
          ].map((card, idx) => (
            <div className="col-sm-6 col-md-4 fade-in-up" key={idx}>
              <div className="card-hover bg-secondary text-white rounded p-4 h-100 d-flex flex-column gap-3 shadow-sm transition-all">
                <div className="display-6">{card.icon}</div>
                <h3 className="fw-bold fs-5">{card.title}</h3>
                <p className="text-light">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-secondary py-4 mt-auto">
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
          <a href="#" className="text-secondary text-decoration-none">Privacy Policy</a>
          <a href="#" className="text-secondary text-decoration-none">Terms of Service</a>
          <Link to="/contact" className="text-secondary text-decoration-none">Contact Us</Link>
        </div>
        <div className="d-flex justify-content-center gap-4 mb-3">
          <a href="#" className="text-secondary" aria-label="Twitter">🐦</a>
          <a href="#" className="text-secondary" aria-label="Facebook">📘</a>
          <a href="#" className="text-secondary" aria-label="Instagram">📸</a>
        </div>
        <div>© 2025 VolunteerConnect. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default About;
