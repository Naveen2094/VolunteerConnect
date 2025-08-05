import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Apply = () => {
  const location = useLocation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    programInterest: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.programInterest) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        alert("Error: " + errData.message || "Failed to submit");
        return;
      }

      alert("Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", programInterest: "" });

    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      {/* Navbar */}
      <header className="border-bottom border-secondary bg-dark">
        <nav className="navbar navbar-expand-md navbar-dark container px-3">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-white text-decoration-none">
            <div style={{ width: 40, height: 40 }}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor" />
              </svg>
            </div>
            <span className="fw-bold fs-4">VolunteerConnect</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-md-3">
              <li className="nav-item">
                <Link className={`nav-link text-white fw-medium ${location.pathname === "/" ? "active-link" : ""}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link text-white fw-medium ${location.pathname === "/about" ? "active-link" : ""}`} to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link text-white fw-medium ${location.pathname === "/programs" ? "active-link" : ""}`} to="/programs">
                  Programs
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link text-white fw-medium ${location.pathname === "/contact" ? "active-link" : ""}`} to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item mt-2 mt-md-0">
                <Link to="/apply" className="btn btn-outline-light fw-bold px-4">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Form Section */}
      <main className="container py-5 flex-grow-1">
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <h2 className="text-center mb-4 fw-bold">Apply Now</h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control bg-secondary text-white border-0"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control bg-secondary text-white border-0"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control bg-secondary text-white border-0"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Program Interest */}
            <div className="mb-4">
              <label className="form-label">Program Interest</label>
              <select
                name="programInterest"
                value={formData.programInterest}
                onChange={handleChange}
                className="form-select bg-secondary text-white border-0"
              >
                <option value="">Select a program</option>
                <option>Environmental Conservation Internship</option>
                <option>Community Development Volunteer Program</option>
                <option>Healthcare Support Internship</option>
              </select>
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </main>

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

export default Apply;
