import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const CreateProgram = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !shortDesc || !longDesc || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);
    formData.append("image", image);
    formData.append("createdBy", name);

    try {
      const res = await fetch("http://localhost:5000/api/program/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to post program");
        return;
      }

      alert("Program submitted for admin verification");
      navigate("/programs");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-dark text-white"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      {/* 🔹 NAVBAR */}
      <header className="border-bottom border-secondary bg-dark">
        <nav className="navbar navbar-expand-md navbar-dark container px-3">
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
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/programs">Programs</Link>
              </li>

              {role && (
                <li className="nav-item d-flex align-items-center text-white fw-medium">
                  <i className="bi bi-person-check me-2"></i>
                  {name}
                  {role === "admin" && (
                    <span className="badge bg-danger ms-2">ADMIN</span>
                  )}
                </li>
              )}

              <li className="nav-item ms-2">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* 🔹 CREATE PROGRAM FORM */}
      <main className="container py-5 flex-grow-1">
        <div className="mx-auto" style={{ maxWidth: "650px" }}>
          <div className="bg-secondary rounded-4 p-4 shadow-lg">
            <h2 className="fw-bold mb-2 text-center">Post a Program</h2>
            <p className="text-center text-light mb-4">
              Your program will be visible after admin verification
            </p>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Program Title</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  rows="2"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Detailed Description</label>
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  rows="4"
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Upload Program Image</label>
                <input
                  type="file"
                  className="form-control bg-dark text-white border-secondary"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="d-grid">
                <button className="btn btn-primary fw-bold">
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* 🔹 FOOTER */}
      <footer className="text-center text-secondary py-4 mt-auto">
        © 2025 VolunteerConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default CreateProgram;
