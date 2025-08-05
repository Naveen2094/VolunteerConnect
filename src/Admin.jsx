import React, { useState, useEffect, useMemo } from "react";

const ITEMS_PER_PAGE = 6;

const Admin = () => {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch applications only if logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetch("/api/admin/applications")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch applications");
          return res.json();
        })
        .then((data) => {
          setApplications(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  // Filter applications based on search
  const filteredApps = useMemo(() => {
    if (!debouncedSearch) return applications;
    return applications.filter(
      (app) =>
        app.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        app.programInterest.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [applications, debouncedSearch]);

  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
  const currentApps = filteredApps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle login submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (username === "ngo_admin" && password === "Welcome@123") {
      setIsLoggedIn(true);
      setLoginError("");
      setUsername("");
      setPassword("");
      setLoading(true);
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setApplications([]);
    setSearchTerm("");
    setCurrentPage(1);
    setLoading(true);
  };

  if (!isLoggedIn) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <form
          onSubmit={handleLoginSubmit}
          className="bg-secondary p-5 rounded shadow"
          style={{ width: "320px" }}
        >
          <h2 className="mb-4 text-center">Admin Login</h2>
          {loginError && (
            <div className="alert alert-danger" role="alert">
              {loginError}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-3 fs-5">Loading applications...</span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        {error}
      </div>
    );

  return (
    <div
      className="bg-dark text-white"
      style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif", padding: "3rem 1rem" }}
    >
      <div
        className="container rounded shadow-lg py-4"
        style={{ backgroundColor: "#2c2f33", minHeight: "80vh" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold display-6 mb-0">Volunteer Applications</h2>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <input
              type="search"
              className="form-control form-control-lg bg-secondary text-white border-0 rounded-pill shadow-sm"
              placeholder="Search by name or program interest..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search applications"
              style={{ transition: "box-shadow 0.3s ease" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 10px #0d6efd")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
        </div>

        {filteredApps.length === 0 ? (
          <p className="text-center fs-5 mt-5">No matching applications found.</p>
        ) : (
          <div className="row g-4">
            {currentApps.map(({ _id, name, email, phone, programInterest, createdAt }) => (
              <div key={_id} className="col-sm-12 col-md-6 col-lg-4">
                <div
                  className="card bg-secondary text-white h-100 shadow-lg border-0"
                  style={{
                    borderRadius: "1rem",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 0 20px #0d6efd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold">{name}</h5>
                      <p className="card-text mb-1">
                        <strong>Email:</strong> {email}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Phone:</strong> {phone}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Program:</strong>{" "}
                        <span className="badge bg-primary">{programInterest}</span>
                      </p>
                    </div>
                    <small className="text-muted mt-3">
                      Applied: {new Date(createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Page navigation" className="d-flex justify-content-center mt-5 gap-3">
            <button
              className="btn btn-outline-primary rounded-pill"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn rounded-pill ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handlePageChange(i + 1)}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-outline-primary rounded-pill"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Admin;
