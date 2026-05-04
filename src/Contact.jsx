import React, { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send: " + data.error);
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1">
        <section className="site-section">
          <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "44rem" }}>
              <span className="section-eyebrow mb-3">Contact us</span>
              <h1 className="section-title mb-3">We are here to support your volunteer journey</h1>
              <p className="section-text mb-0">
                Reach out with questions, partnership ideas, or feedback. We would love to hear from you.
              </p>
            </div>

            <div className="row g-4 align-items-stretch">
              <div className="col-lg-7">
                <div className="site-panel form-card h-100">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label fw-semibold">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control site-input"
                          placeholder="Your name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label fw-semibold">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control site-input"
                          placeholder="you@example.com"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label fw-semibold">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control site-input"
                          placeholder="How can we help?"
                          id="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label fw-semibold">
                          Message
                        </label>
                        <textarea
                          className="form-control site-textarea"
                          rows="5"
                          placeholder="Tell us a bit more..."
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary site-button w-100 mt-4">
                      <FiSend size={18} />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="site-panel contact-card h-100">
                  <span className="section-eyebrow mb-3">Support details</span>
                  <h2 className="h3 fw-bold mb-4">Let us make the next step easier</h2>
                  <div className="footer-contact">
                
                    <span>
                      <FiPhone size={18} />
                      <span>866917918</span>
                    </span>
                    <span>
                      <FiMail size={18} />
                      <span>support@volunteerconnect.org</span>
                    </span>
                  </div>
                  <p className="muted-text mt-4 mb-0">
                    Our team replies as quickly as possible and can help with program questions, account support, and
                    partnership requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Contact;
