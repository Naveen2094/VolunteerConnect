import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import { Link, useLocation } from "react-router-dom";

const Programs = () => {
  const location = useLocation();
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      title: "Environmental Conservation Internship",
      shortDesc:
        "Join our team to protect and restore natural habitats. Gain hands-on experience in conservation efforts.",
      longDesc:
        "This program offers real-world conservation work involving wildlife protection, sustainable land use, reforestation, and biodiversity preservation. Interns will work alongside experienced environmentalists in rural and urban settings.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDFanWs0kDlN-IuTBbN3zHTEV7UrWWRunYyx4MNR6G6LjnRcEe8Std447Kr3DO5uM8SYCPyFvWm43b5r7LoZ0Qf0Oihp9kpEcJ8T7LrZlIlzhezY_vB2nEfr9eJDcWBYA97pTCbMtnvko-CsFYfJLjr2VIkDk-ZP3Tf2maX27MD55ii1cHZ7ZdFm8xNY0Oa1J8nGBV7B0HJa4BUgo5XxNeW0FJh27tKXXocVb9307WAZTodUOPS8gYLybSfNCs2BMVG0pEInyN4bkQ",
    },
    {
      title: "Community Development Volunteer Program",
      shortDesc:
        "Work directly with local communities to support education, health, and economic development initiatives.",
      longDesc:
        "Volunteers will assist in organizing workshops, teaching children, running awareness campaigns, and developing small-scale infrastructure for underprivileged areas.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuARbckODZ2uwyZPJOvzjm4JYaCLwPRFPbkOlc8GaIxyRy2EYCt-nnLPR3Z-R2SoTw8w-RQQj_RAEXUhoa6laShopi8OB5OWRAGumgmaGAqBeLhe1238A_cm_aKESNHamr_04_LOlJigsSisRrPPb11QcSZG9RrN2mUeljOD-z1qvLmAkk7GHS9xJyfbiiCMCnJip_FmDH4kZzw-Bk1HiviETQzyKy1fzITKiUe_NLlY2khOjWMXVupPzE5n3shDh_MHU8CFPLTBLUs",
    },
    {
      title: "Healthcare Support Internship",
      shortDesc:
        "Assist healthcare professionals in various settings, gaining insights into the medical field and patient care.",
      longDesc:
        "Interns shadow doctors and nurses in clinics and hospitals, help with patient records, and support outreach health camps in underserved areas.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB5q02Mu20Mj0Z_8m3oM7KnCrO2OQg2jA00U1wy0vHlMFB3m7n0msW9pjp-Y3PPZ10rAbd-EH4bw_8QqCb_YBJPfmKkmjQb0mkRPlspZhcepZDN_h6hE9fdGqvNwpWMzzpyKQbHU3TDHe84eqtkPfGkGDUOxwY_yK0m7NDn4maQzRO-0BUT311YCbnbqMu6EJj7TEjbiXMXAuxs-Krk40Ck_ixwHmdjOusldBF125qhVq2ueVCogH5pN7Xs891zxHmc70imInLsBJE",
    },
  ];

  useEffect(() => {
    if (selectedProgram) {
      const modalElement = document.getElementById("programModal");
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        return () => {
          modal.hide();
        };
      }
    }
  }, [selectedProgram]);

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-dark text-white"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      {/* Navbar */}
      <header className="border-bottom border-secondary bg-dark">
        <nav className="navbar navbar-expand-md navbar-dark container px-3">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <div style={{ width: 40, height: 40 }}>
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
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
                <Link
                  to="/"
                  className={`nav-link text-white fw-medium ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link text-white fw-medium ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/programs"
                  className={`nav-link text-white fw-medium ${
                    location.pathname === "/programs" ? "active" : ""
                  }`}
                >
                  Programs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-white fw-medium">
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

      {/* Program Section */}
      <main className="container py-5 flex-grow-1">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Internship and Volunteer Programs</h1>
          <p className="text-secondary">
            Explore programs designed to provide experience and contribute to meaningful causes.
          </p>
        </div>

        <div className="row g-4">
          {programs.map((program, index) => (
            <div key={index} className="col-12">
              <div className="d-flex flex-column flex-md-row bg-secondary rounded-4 overflow-hidden shadow">
                <div className="p-4 flex-grow-1">
                  <h5 className="fw-bold">{program.title}</h5>
                  <p className="text-light">{program.shortDesc}</p>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => setSelectedProgram(program)}
                  >
                    View Details
                  </button>
                </div>
                <div
                  className="flex-grow-1"
                  style={{
                    minHeight: "200px",
                    backgroundImage: `url(${program.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="programModal"
        tabIndex="-1"
        aria-labelledby="programModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title" id="programModalLabel">
                {selectedProgram?.title}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedProgram(null)}
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={selectedProgram?.image}
                alt={selectedProgram?.title}
                className="img-fluid rounded mb-3"
              />
              <p>{selectedProgram?.longDesc}</p>
            </div>
            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn btn-outline-light"
                data-bs-dismiss="modal"
                onClick={() => setSelectedProgram(null)}
              >
                Close
              </button>
              <Link to="/apply" className="btn btn-primary" onClick={() => setSelectedProgram(null)}>
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

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

export default Programs;
