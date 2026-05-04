import React, { useEffect, useMemo, useState } from "react";
import { FiClock, FiSearch, FiShield } from "react-icons/fi";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";

const ITEMS_PER_PAGE = 6;

const Admin = () => {
  const role = localStorage.getItem("role");

  const [applications, setApplications] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/admin/applications").then((res) => res.json()),
      fetch("http://localhost:5000/api/program/admin/all").then((res) => res.json()),
    ])
      .then(([apps, progs]) => {
        setApplications(apps);
        setPrograms(progs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredApps = useMemo(() => {
    if (!debouncedSearch) return applications;

    const searchValue = debouncedSearch.toLowerCase();

    return applications.filter((application) => {
      const programName = application.programTitle || application.programInterest || "";
      return (
        (application.name || "").toLowerCase().includes(searchValue) ||
        programName.toLowerCase().includes(searchValue) ||
        (application.email || "").toLowerCase().includes(searchValue) ||
        (application.phone || "").toLowerCase().includes(searchValue)
      );
    });
  }, [applications, debouncedSearch]);

  const currentApps = filteredApps.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const updateProgramStatus = async (id, action) => {
    await fetch(`http://localhost:5000/api/program/${action}/${id}`, { method: "PUT" });
    setPrograms((prev) => prev.filter((program) => program._id !== id));
  };

  if (role !== "admin") {
    return (
      <div className="page-shell">
        <SiteNavbar />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
          <div className="site-panel p-5 text-center" style={{ maxWidth: "32rem" }}>
            <FiShield size={40} className="mb-3" />
            <h1 className="h3 fw-bold">Access Denied</h1>
            <p className="muted-text mb-0">Admin access only.</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-shell">
        <SiteNavbar />
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="spinner-border text-success" />
            <span>Loading Admin Dashboard...</span>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1 site-section">
        <div className="container">
          <div className="mb-5">
            <span className="admin-section-label">Dashboard</span>
            <h1 className="section-title mt-2 mb-3">Admin overview</h1>
            <p className="section-text mb-0">Review volunteer applications and verify newly submitted programs.</p>
          </div>

          <section className="mb-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
              <div>
                <span className="admin-section-label">Applications</span>
                <h2 className="h3 fw-bold mt-2 mb-0">Volunteer Applications</h2>
              </div>
              <div className="search-input-group" style={{ maxWidth: "28rem", width: "100%" }}>
                <FiSearch size={18} />
                <input
                  type="search"
                  className="form-control site-input"
                  placeholder="Search by volunteer or program"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="row g-4">
              {currentApps.map((app) => {
                const programName = app.programTitle || app.programInterest || "Program not provided";

                return (
                  <div key={app._id} className="col-md-6 col-xl-4">
                    <div className="dashboard-card h-100">
                      <h3 className="h5 fw-bold mb-3">{app.name}</h3>
                      <p className="muted-text mb-2">Email: {app.email}</p>
                      <p className="muted-text mb-2">Phone: {app.phone}</p>
                      <p className="muted-text mb-3">Program: {programName}</p>
                      <span className="program-badge text-capitalize">{app.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-4">
              <span className="admin-section-label">Verification</span>
              <h2 className="h3 fw-bold mt-2 mb-0">Pending Programs</h2>
            </div>

            {programs.filter((program) => ["created", "pending"].includes(program.status)).length === 0 && (
              <div className="site-panel p-4">
                <p className="muted-text mb-0">No pending programs</p>
              </div>
            )}

            <div className="row g-4">
              {programs
                .filter((program) => ["created", "pending"].includes(program.status))
                .map((program) => (
                  <div key={program._id} className="col-lg-6">
                    <div className="dashboard-card h-100">
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <FiClock size={16} />
                        <span className="program-badge">Pending review</span>
                      </div>
                      <h3 className="h4 fw-bold">{program.title}</h3>
                      <p className="muted-text mb-2">{program.shortDesc}</p>
                      <p className="muted-text mb-1">Category: {program.category}</p>
                      <p className="muted-text mb-1">Location: {program.location}</p>
                      <p className="muted-text mb-0">
                        Volunteers: {program.currentVolunteers || 0} / {program.requiredVolunteers || 0}
                      </p>

                      <div className="d-flex flex-wrap gap-2 mt-4">
                        <button className="btn btn-success site-button px-4" onClick={() => updateProgramStatus(program._id, "approve")}>
                          Approve
                        </button>

                        <button className="btn btn-danger site-danger-button px-4" onClick={() => updateProgramStatus(program._id, "reject")}>
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Admin;
