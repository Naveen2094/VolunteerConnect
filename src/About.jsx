import React, { useState } from "react";
import { FiCompass, FiLink2, FiUsers } from "react-icons/fi";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";

const missionCards = [
  {
    title: "Empowering Communities",
    text: "We collaborate with NGOs and organizations to empower local communities through hands-on projects and initiatives.",
    icon: FiUsers,
  },
  {
    title: "Connecting Volunteers",
    text: "Our platform connects motivated volunteers with causes they care about to maximize impact.",
    icon: FiLink2,
  },
  {
    title: "Sustainable Impact",
    text: "We focus on long-term sustainability and growth, ensuring our efforts make a real difference.",
    icon: FiCompass,
  },
];

const About = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1">
        <section className="hero-section">
          <div
            className="hero-backdrop"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(59, 130, 246, 0.1)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80")',
            }}
          />
          <div className="container hero-content">
            <div className="row justify-content-center">
              <div className="col-lg-9 text-center">
                <span className="hero-pill mb-3">About VolunteerConnect</span>
                <h1 className="section-title mb-3">Connecting service-minded people with meaningful opportunities</h1>
                <p className="section-text fs-5 mb-4">
                  VolunteerConnect is dedicated to connecting passionate individuals with impactful volunteer and
                  internship opportunities to foster personal growth and community development.
                </p>
                <button type="button" className="btn btn-primary site-button px-5" onClick={() => setShowDetails((prev) => !prev)}>
                  {showDetails ? "Show Less" : "Learn More"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {showDetails && (
          <section className="site-section pt-0">
            <div className="container">
              <div className="site-panel p-4 p-lg-5">
                <div className="row g-4">
                  <div className="col-md-4">
                    <h3 className="h4 fw-bold">Our Story</h3>
                    <p className="muted-text mb-0">
                      Founded in 2023, VolunteerConnect has helped thousands of volunteers find meaningful work and
                      make a lasting impact worldwide.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h3 className="h4 fw-bold">What We Offer</h3>
                    <p className="muted-text mb-0">
                      Personalized volunteer matching, skill development workshops, networking opportunities, and
                      ongoing support.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h3 className="h4 fw-bold">Join Us</h3>
                    <p className="muted-text mb-0">
                      Become part of a growing community that values empathy, action, and sustainable change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="site-section">
          <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "44rem" }}>
              <span className="section-eyebrow mb-3">Mission and vision</span>
              <h2 className="section-title mb-3">Built around trust, service, and long-term community growth</h2>
              <p className="section-text mb-0">
                We strive to create meaningful experiences that empower volunteers to create lasting change in their
                communities while growing their own skills and networks.
              </p>
            </div>

            <div className="row g-4">
              {missionCards.map(({ title, text, icon: Icon }) => (
                <div className="col-md-4" key={title}>
                  <div className="feature-card h-100">
                    <div className="feature-icon-wrap mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="fw-bold h4 mb-3">{title}</h3>
                    <p className="muted-text mb-0">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default About;
