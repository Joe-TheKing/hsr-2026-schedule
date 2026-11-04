import React from "react";
import { getScheduleData } from "@/lib/schedule";
import ScheduleClient from "@/components/ScheduleClient";

// Force dynamic rendering so edits to data/sessions.json or via /api/sessions reflect immediately
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { heroStats, sessions } = await getScheduleData();

  return (
    <>
      {/* Top Brand Header */}
      <header className="brand-header">
        <div className="container brand-header-inner">
          <a
            href="#"
            aria-label="NIHR Global Health Research Centre for Non-communicable Disease Control in West Africa"
          >
            <img
              src="/NIHR Global Health Research Centre for Non-communicable Disease Control in West Africa rgb_outlined-col.svg"
              alt="NIHR | Global Health Research Centre for Non-communicable Disease Control in West Africa"
              className="nihr-logo"
            />
          </a>
          <div className="hsr-logo-wrap">
            <a
              href="https://sprintexpo.eventsair.com/hsr-2026"
              target="_blank"
              rel="noopener noreferrer"
              title="Official HSR 2026 Symposium Website"
            >
              <img
                src="/assets/hsr2026-logo.png"
                alt="HSR 2026 Symposium Logo"
                className="hsr-logo"
              />
            </a>
            <a
              href="https://sprintexpo.eventsair.com/hsr-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="header-cta"
            >
              HSR 2026 Website
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section (Visual mirror of the STOP-NCD at HSR2026 flyers) */}
      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-content">
            <div className="join-badge">Join</div>
            <h1 className="hero-title">
              STOP NCD
              <br />
              AT HSR2026
            </h1>
            <div className="hero-coral-rule" aria-hidden="true"></div>
            <p className="hero-standfirst">
              Join us for a series of engaging sessions showcasing evidence,
              innovation and community-led solutions for NCD prevention and care in
              West Africa
            </p>

            <div className="hero-meta">
              <div className="meta-item date">
                <span className="meta-icon coral" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </span>
                <span>7–9 December 2026</span>
              </div>

              <div className="meta-item location">
                <span className="meta-icon navy" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>The American University in Cairo (AUC), Egypt</span>
              </div>
            </div>
          </div>

          {/* Graphic Texture & Stats Panel */}
          <div className="hero-graphic-panel">
            <div className="grain-box-blue">
              <div className="hero-stats-card">
                <div className="hero-stats-grid">
                  {heroStats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="stat-num">
                        {stat.value}
                        <span>{stat.suffix}</span>
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grain-box-coral" aria-hidden="true">
              <svg
                width="36"
                height="22"
                viewBox="0 0 36 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11H33M33 11L24 2M33 11L24 20"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Programme Schedule */}
      <ScheduleClient initialSessions={sessions} />

      {/* Join the Conversation Banner (From Flyer 1) */}
      <section className="conversation-banner">
        <div className="container conversation-inner">
          <div className="conv-left">
            <h2>Join the Conversation</h2>
            <p>Explore Stop-NCD sessions at HSR 2026</p>
          </div>
          <div className="conv-divider" aria-hidden="true"></div>
          <div className="conv-mid">
            <p>Scan to view our social media platforms and connect with us</p>
          </div>
          <div className="qr-box">
            <img
              src="/assets/qr-code.png"
              alt="QR Code to connect with STOP-NCD social media platforms"
            />
          </div>
        </div>
      </section>

      {/* Footer: NIHR Acknowledgement & Partner Institutions */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="funding-statement">
            <p>
              This research is funded by the NIHR (NIHR203246) using UK international
              development funding from the UK Government to support global health
              research. The views expressed in this publication are those of the
              author(s) and not necessarily those of the NIHR or the UK government.
            </p>
          </div>
          <div className="partners-block">
            <div className="partners-title">Partner Institutions</div>
            <img
              src="/assets/partner-logos-strip.png"
              alt="Partner Institutions: London School of Hygiene & Tropical Medicine (LSHTM), Ghana College of Physicians and Surgeons (GCPS), LASDEL, UCAO-UUB (CUWA), and Ashesi University"
              className="partner-logos-img"
            />
            <span className="partner-names-sr">
              London School of Hygiene &amp; Tropical Medicine, Ghana College of
              Physicians and Surgeons, LASDEL, Université Catholique de l&apos;Afrique
              de l&apos;Ouest (UCAO-UUB), Ashesi University
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
