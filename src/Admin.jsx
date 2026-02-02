import React, { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 6;

const Admin = () => {
  const role = localStorage.getItem("role");

  /* ======================
     BLOCK NON-ADMIN
  ====================== */
  if (role !== "admin") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>Admin access only</p>
        </div>
      </div>
    );
  }

  /* ======================
     STATE
  ====================== */
  const [applications, setApplications] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ======================
     DEBOUNCE SEARCH
  ====================== */
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  /* ======================
     FETCH ADMIN DATA
  ====================== */
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/admin/applications").then(res => res.json()),
      fetch("http://localhost:5000/api/program/admin/all").then(res => res.json())
    ])
      .then(([apps, progs]) => {
        setApplications(apps);
        setPrograms(progs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ======================
     FILTER APPLICATIONS
  ====================== */
  const filteredApps = useMemo(() => {
    if (!debouncedSearch) return applications;
    return applications.filter(
      (a) =>
        a.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        a.programInterest.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [applications, debouncedSearch]);

  const currentApps = filteredApps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ======================
     PROGRAM ACTIONS
  ====================== */
  const updateProgramStatus = async (id, action) => {
    await fetch(
      `http://localhost:5000/api/program/${action}/${id}`,
      { method: "PUT" }
    );

    setPrograms(programs.filter(p => p._id !== id));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="spinner-border text-primary" />
        <span className="ms-3">Loading Admin Dashboard...</span>
      </div>
    );
  }

  /* ======================
     UI
  ====================== */
  return (
    <div className="bg-dark text-white min-vh-100 p-4">
      <div className="container">

        {/* ======================
            APPLICATIONS
        ====================== */}
        <h2 className="fw-bold mb-3">Volunteer Applications</h2>

        <input
          type="search"
          className="form-control bg-secondary text-white mb-4"
          placeholder="Search by name or program..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="row g-4 mb-5">
          {currentApps.map(app => (
            <div key={app._id} className="col-md-4">
              <div className="card bg-secondary text-white h-100">
                <div className="card-body">
                  <h5>{app.name}</h5>
                  <p>Email: {app.email}</p>
                  <p>Phone: {app.phone}</p>
                  <span className="badge bg-primary">{app.programInterest}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ======================
            PROGRAM VERIFICATION
        ====================== */}
        <h2 className="fw-bold mb-3">Pending Programs</h2>

        {programs.filter(p => p.status === "pending").length === 0 && (
          <p className="text-secondary">No pending programs</p>
        )}

        {programs
          .filter(p => p.status === "pending")
          .map(p => (
            <div key={p._id} className="bg-secondary p-4 rounded mb-3">
              <h5>{p.title}</h5>
              <p>{p.shortDesc}</p>

              <button
                className="btn btn-success me-2"
                onClick={() => updateProgramStatus(p._id, "approve")}
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={() => updateProgramStatus(p._id, "reject")}
              >
                Reject
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;
