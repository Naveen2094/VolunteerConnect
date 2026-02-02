import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import { Link, useLocation } from "react-router-dom";

const Programs = () => {
  const location = useLocation();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState([]);

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // Fetch programs
  useEffect(() => {
    fetch("http://localhost:5000/api/program")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  // Delete program (ADMIN)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;

    const res = await fetch(
      `http://localhost:5000/api/program/delete/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();
    alert(data.message);
    setPrograms(programs.filter((p) => p._id !== id));
  };

  // Modal logic
  useEffect(() => {
    if (selectedProgram) {
      const modal = new bootstrap.Modal(
        document.getElementById("programModal")
      );
      modal.show();
      return () => modal.hide();
    }
  }, [selectedProgram]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      
      {/* ================= NAVBAR ================= */}
      <header className="border-bottom border-secondary bg-dark">
        <nav className="navbar navbar-expand-md navbar-dark container px-3">
          <Link to="/" className="navbar-brand fw-bold fs-4 text-white">
            VolunteerConnect
          </Link>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-md-3">
              
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`} to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/programs" ? "active-link" : ""}`} to="/programs">
                  Programs
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>

              {/* NOT LOGGED IN */}
              {!role && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="bi bi-person-circle me-1"></i>Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="bi bi-person-plus me-1"></i>Register
                    </Link>
                  </li>
                </>
              )}

              {/* LOGGED IN */}
              {role && (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/create-program">
        <i className="bi bi-plus-circle me-1"></i>
        Post Program
      </Link>
    </li>

    <li className="nav-item d-flex align-items-center text-white">
      <i className="bi bi-person-check me-2"></i>
      {name}
    </li>

    {role === "admin" && (
      <li className="nav-item">
        <Link className="nav-link text-white fw-medium" to="/admin">
          <i className="bi bi-shield-lock me-1"></i>
          Admin Dashboard
        </Link>
      </li>
    )}

    <li className="nav-item">
      <button
        className="btn btn-outline-light btn-sm"
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

      {/* ================= PROGRAM LIST ================= */}
      <main className="container py-5 flex-grow-1">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Internship and Volunteer Programs</h1>
          <p className="text-secondary">
            Explore verified programs and contribute to meaningful causes.
          </p>
        </div>

        <div className="row g-4">
          {programs.map((program) => (
            <div key={program._id} className="col-12">
              <div className="d-flex flex-column flex-md-row bg-secondary rounded-4 overflow-hidden shadow">

                <div className="p-4 flex-grow-1">
                  <h5 className="fw-bold">{program.title}</h5>
                  <p className="text-light">{program.shortDesc}</p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => setSelectedProgram(program)}
                    >
                      View Details
                    </button>

                    {role === "admin" && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(program._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                <div className="col-md-4 p-0">
                  <img
                    src={`http://localhost:5000/uploads/programs/${program.image}`}
                    alt={program.title}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= MODAL ================= */}
      <div className="modal fade" id="programModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title">{selectedProgram?.title}</h5>
              <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <img
                src={`http://localhost:5000/uploads/programs/${selectedProgram?.image}`}
                className="img-fluid rounded mb-3"
                alt=""
              />
              <p>{selectedProgram?.longDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-secondary py-4 mt-auto">
        © 2025 VolunteerConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default Programs;
