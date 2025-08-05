import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "./App.css"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert("❌ Failed to send: " + data.error);
      }
    } catch (err) {
      alert("❌ Network error");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-dark text-white"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      {/* Header */}
      <header className="border-bottom border-secondary bg-dark">
        <nav className="navbar navbar-expand-md navbar-dark container px-3">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-white text-decoration-none">
            <div style={{ width: 40, height: 40 }}>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="fw-bold fs-4">VolunteerConnect</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-md-3">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white fw-medium">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-white fw-medium">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/programs" className="nav-link text-white fw-medium">Programs</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-white fw-medium active-link">Contact</Link>
              </li>
              <li className="nav-item mt-2 mt-md-0">
                <Link to="/apply" className="btn btn-outline-light fw-bold px-4">Apply Now</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Contact Section */}
      <main className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">Get in Touch</h2>
          <p className="text-light">
            We're here to help! Reach out with any questions or feedback you may have.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="bg-secondary bg-opacity-50 p-4 rounded shadow-sm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-medium">Name</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-0"
                  placeholder="Your Name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">Email</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-0"
                  placeholder="Your Email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label fw-medium">Subject</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-0"
                  placeholder="Subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-medium">Message</label>
                <textarea
                  className="form-control bg-dark text-white border-0"
                  rows="5"
                  placeholder="Your Message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary fw-bold w-100">Send Message</button>
            </form>

            {/* Contact Info */}
            <div className="mt-5 text-light">
              <h4 className="fw-bold">Contact Information</h4>
              <p>📍 Address: 123 Innovation Drive, Tech City, CA 90210</p>
              <p>📞 Phone: (555) 123-4567</p>
              <p>📧 Email: support@internconnect.com</p>
            </div>

            {/* Social Media */}
            <div className="mt-4">
              <h5 className="fw-bold text-white">Follow Us</h5>
              <div className="d-flex gap-3 mt-2 fs-4">
                <a href="#" className="text-white" aria-label="Twitter">🐦</a>
                <a href="#" className="text-white" aria-label="Facebook">📘</a>
                <a href="#" className="text-white" aria-label="Instagram">📸</a>
                <a href="#" className="text-white" aria-label="LinkedIn">🔗</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-secondary py-4 mt-auto">
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
          <a href="#" className="text-secondary text-decoration-none">Privacy Policy</a>
          <a href="#" className="text-secondary text-decoration-none">Terms of Service</a>
          <a href="#" className="text-secondary text-decoration-none">Contact Us</a>
        </div>
        <div className="d-flex justify-content-center gap-4 mb-3">
          <a href="#" className="text-secondary" aria-label="Twitter">🐦</a>
          <a href="#" className="text-secondary" aria-label="Facebook">📘</a>
          <a href="#" className="text-secondary" aria-label="Instagram">📸</a>
        </div>
        <div>© 2025 InternConnect. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Contact;
