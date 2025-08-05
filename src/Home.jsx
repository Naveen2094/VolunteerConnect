import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

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

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
                              </Link> </li>
            </ul>
            
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main
        className="flex-grow-1 d-flex justify-content-center align-items-center px-3 py-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://st4.depositphotos.com/16122460/29031/i/450/depositphotos_290310662-stock-photo-team-of-volunteers-in-uniform.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "480px",
        }}
      >
        <div className="text-center text-white" style={{ maxWidth: "720px" }}>
          <h1 className="display-5 fw-bold mb-3">
            Make a Difference with VolunteerConnect
          </h1>
          <p className="lead mb-4">
            Join a community of passionate individuals dedicated to creating
            positive change through meaningful volunteer and internship
            opportunities.
          </p>
          <Link to="/programs" className="btn btn-primary btn-lg px-5">Explore Opportunities</Link>
        </div>
      </main>

      {/* Why Choose Us */}
      <section className="container py-5">
        <div className="mb-4 text-center mx-auto" style={{ maxWidth: 720 }}>
          <h2 className="fw-bold fs-2">Why Choose VolunteerConnect?</h2>
          <p>
            Discover the benefits of joining our program and how it can help you
            grow personally and professionally.
          </p>
        </div>
        <div className="row g-4">
          {[
            {
              title: "Impactful Projects",
              text: "Engage in projects that address real-world challenges and make a tangible difference in communities.",
              icon: "🌍",
            },
            {
              title: "Community Support",
              text: "Connect with like-minded individuals, mentors, and organizations that share your passion for service.",
              icon: "🤝",
            },
            {
              title: "Personal Growth",
              text: "Develop new skills, gain valuable experience, and expand your network while contributing to causes you care about.",
              icon: "📈",
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

      {/* Call to Action */}
      <section className="text-center text-white py-5 px-3" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 className="fw-bold fs-2 mb-3">Ready to Begin Your Journey?</h2>
        <p className="mb-4">
          Join VolunteerConnect today and start making a difference in the world.
        </p>
        <Link to="/apply" className="btn btn-primary btn-lg px-5">
          Get Started
        </Link>

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

export default Home;
