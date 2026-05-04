import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiHeart, FiTrendingUp } from "react-icons/fi";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";

const highlights = [
  {
    title: "Impactful Projects",
    text: "Engage in projects that address real-world challenges and make a tangible difference in communities.",
    icon: FiHeart,
  },
  {
    title: "Community Support",
    text: "Connect with like-minded individuals, mentors, and organizations that share your passion for service.",
    icon: FiAward,
  },
  {
    title: "Personal Growth",
    text: "Develop new skills, gain valuable experience, and expand your network while contributing to causes you care about.",
    icon: FiTrendingUp,
  },
];

const Home = () => {
  return (
    <div className="page-shell">
      <SiteNavbar />

      <main className="flex-grow-1">
        <section className="hero-section">
          <div
            className="hero-backdrop"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(14, 165, 233, 0.08)), url("https://st4.depositphotos.com/16122460/29031/i/450/depositphotos_290310662-stock-photo-team-of-volunteers-in-uniform.jpg")',
            }}
          />

          <div className="container hero-content">
            <div className="row align-items-center hero-grid g-5">
              <div className="col-lg-7">
                <span className="hero-pill mb-3">Volunteer opportunities that feel human</span>
                <h1 className="section-title mb-3">Make a Difference with VolunteerConnect</h1>
                <p className="section-text fs-5 mb-4" style={{ maxWidth: "42rem" }}>
                  Join a community of passionate individuals dedicated to creating positive change through meaningful
                  volunteer and internship opportunities.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/programs" className="btn btn-primary site-button px-4">
                    <span>Explore Opportunities</span>
                    <FiArrowRight size={18} />
                  </Link>
                  <Link to="/apply" className="btn btn-outline-secondary site-outline-button px-4">
                    Start Your Journey
                  </Link>
                </div>
              </div>

              <div className="col-lg-5 d-flex justify-content-lg-end">
                <div className="hero-stat-card surface-card">
                  <span className="section-eyebrow mb-3">Community impact</span>
                  <strong>10,000+ Volunteer Hours</strong>
                  <p className="muted-text mb-0">
                    Supported through verified programs, service initiatives, and internship placements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section">
          <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "46rem" }}>
              <span className="section-eyebrow mb-3">Why choose us</span>
              <h2 className="section-title mb-3">A platform built for impact, clarity, and connection</h2>
              <p className="section-text mb-0">
                Discover the benefits of joining our program and how it can help you grow personally and professionally.
              </p>
            </div>

            <div className="row g-4">
              {highlights.map(({ title, text, icon: Icon }) => (
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

        <section className="site-section pt-0">
          <div className="container">
            <div className="site-panel p-4 p-lg-5 text-center mx-auto" style={{ maxWidth: "52rem" }}>
              <span className="section-eyebrow mb-3">Take the next step</span>
              <h2 className="section-title mb-3">Ready to Begin Your Journey?</h2>
              <p className="section-text fs-5 mb-4">
                Join VolunteerConnect today and start making a difference in the world.
              </p>
              <Link to="/apply" className="btn btn-primary site-button px-5">
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Home;
