import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import { isProgramFull } from "./utils/programMeta";

const Apply = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = localStorage.getItem("userId");
  const storedName = localStorage.getItem("name") || "";
  const storedPhone = localStorage.getItem("phone") || "";
  const storedEmail = localStorage.getItem("email") || "";
  const selectedProgramId = searchParams.get("programId") || "";

  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: storedName,
    email: storedEmail,
    phone: storedPhone,
    programId: selectedProgramId,
  });

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      alert("Please login to apply");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/program")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch(() => setPrograms([]));
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, programId: selectedProgramId || prev.programId }));
  }, [selectedProgramId]);

  const selectedProgram = useMemo(
    () => programs.find((program) => program._id === formData.programId),
    [programs, formData.programId]
  );

  const isSelectedProgramUnavailable = selectedProgram
    ? isProgramFull(selectedProgram) || selectedProgram.status === "closed"
    : false;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !formData.name || !formData.email || !formData.phone || !formData.programId) {
      alert("Please fill in all fields");
      return;
    }

    if (!selectedProgram) {
      alert("Please select a valid program");
      return;
    }

    if (isSelectedProgramUnavailable) {
      alert("Program Full");
      return;
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          programId: formData.programId,
          programTitle: selectedProgram.title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to submit");
        return;
      }

      localStorage.setItem("email", formData.email);
      alert("Application submitted successfully!");
      navigate("/programs");
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1 site-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <span className="section-eyebrow mb-3">Application form</span>
                <h1 className="section-title mb-3">Apply to your next opportunity</h1>
                <p className="section-text mb-0">
                  Complete your application below and our team will review it as soon as possible.
                </p>
              </div>

              <div className="site-panel form-card">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control site-input"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control site-input"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control site-input"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Program Interest</label>
                      <select
                        name="programId"
                        value={formData.programId}
                        onChange={handleChange}
                        className="form-select site-select"
                      >
                        <option value="">Select a program</option>
                        {programs.map((program) => {
                          const isUnavailable = isProgramFull(program) || program.status === "closed";

                          return (
                            <option key={program._id} value={program._id} disabled={isUnavailable}>
                              {program.title}{isUnavailable ? " (Full)" : ""}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {selectedProgram && isSelectedProgramUnavailable && (
                    <div className="alert alert-warning rounded-4 mt-4 mb-0">Program Full</div>
                  )}

                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary site-button" disabled={isSelectedProgramUnavailable}>
                      {isSelectedProgramUnavailable ? "Program Full" : "Submit Application"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Apply;
