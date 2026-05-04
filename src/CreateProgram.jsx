import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import { PROGRAM_CATEGORIES } from "./utils/programMeta";

const CreateProgram = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [category, setCategory] = useState(PROGRAM_CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [requiredVolunteers, setRequiredVolunteers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !shortDesc || !category || !location || !requiredVolunteers || !startDate || !startTime || !image) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("shortDesc", shortDesc);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("requiredVolunteers", requiredVolunteers);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("createdBy", localStorage.getItem("name"));
    formData.append("image", image);

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
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1 site-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <div className="text-center mb-5">
                <span className="section-eyebrow mb-3">Program publishing</span>
                <h1 className="section-title mb-3">Post a program for review</h1>
                <p className="section-text mb-0">
                  Share the opportunity details below. Your program will appear after admin verification.
                </p>
              </div>

              <div className="site-panel form-card">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Program Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control site-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Short Description</label>
                      <textarea
                        name="shortDesc"
                        className="form-control site-textarea"
                        rows="3"
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        name="category"
                        className="form-select site-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        {PROGRAM_CATEGORIES.map((categoryOption) => (
                          <option key={categoryOption} value={categoryOption}>
                            {categoryOption}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Location</label>
                      <input
                        type="text"
                        name="location"
                        className="form-control site-input"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter city name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Required Volunteers</label>
                      <input
                        type="number"
                        min="1"
                        name="requiredVolunteers"
                        className="form-control site-input"
                        value={requiredVolunteers}
                        onChange={(e) => setRequiredVolunteers(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Upload Program Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control site-input"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        className="form-control site-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        className="form-control site-input"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Start Time</label>
                      <input
                        type="time"
                        name="startTime"
                        className="form-control site-input"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">End Time</label>
                      <input
                        type="time"
                        name="endTime"
                        className="form-control site-input"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-grid mt-4">
                    <button className="btn btn-primary site-button">Submit for Verification</button>
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

export default CreateProgram;
