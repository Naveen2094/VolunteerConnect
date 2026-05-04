import React, { useEffect, useMemo, useState } from "react";
import { FiFilter, FiMapPin, FiSearch } from "react-icons/fi";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import ProgramCard from "./components/ProgramCard";
import { getProgramCategory, getProgramLocation } from "./utils/programMeta";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetch("http://localhost:5000/api/program")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;

    const res = await fetch(`http://localhost:5000/api/program/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);
    setPrograms((prev) => prev.filter((program) => program._id !== id));
  };

  const categoryOptions = useMemo(() => {
    const categories = programs.map(getProgramCategory).filter(Boolean);
    return ["All Categories", ...new Set(categories)];
  }, [programs]);

  const locationOptions = useMemo(() => {
    const locations = programs.map(getProgramLocation).filter(Boolean);
    return ["All Locations", ...new Set(locations)];
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const category = getProgramCategory(program);
      const location = getProgramLocation(program);
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === "All Locations" || location === locationFilter;
      const matchesCategory = categoryFilter === "All Categories" || category === categoryFilter;

      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [programs, searchTerm, locationFilter, categoryFilter]);

  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1 site-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-eyebrow mb-3">Verified opportunities</span>
            <h1 className="section-title mb-3">Internship and Volunteer Programs</h1>
            <p className="section-text mx-auto mb-0" style={{ maxWidth: "42rem" }}>
              Explore current opportunities, browse by focus area, and apply to meaningful programs that match your
              interests.
            </p>
          </div>

          <div className="search-panel site-panel mb-5">
            <div className="row g-3">
              <div className="col-lg-5">
                <div className="search-input-group">
                  <FiSearch size={18} />
                  <input
                    type="text"
                    className="form-control site-input"
                    placeholder="Search Programs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="search-input-group">
                  <FiMapPin size={18} />
                  <select
                    className="form-select site-select"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    {locationOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="search-input-group">
                  <FiFilter size={18} />
                  <select
                    className="form-select site-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categoryOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {filteredPrograms.map((program) => (
              <div key={program._id} className="col-md-6 col-xl-4">
                <ProgramCard program={program} onDelete={handleDelete} isAdmin={role === "admin"} />
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="site-panel p-4 text-center mt-4">
              <h2 className="h4 fw-bold">No programs found</h2>
              <p className="muted-text mb-0">Try adjusting the search text or filters to explore more opportunities.</p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Programs;
