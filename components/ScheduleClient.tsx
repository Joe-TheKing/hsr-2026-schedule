"use client";

import React, { useState, useMemo } from "react";
import type { SessionItem, SessionCategory } from "@/lib/schedule";

interface ScheduleClientProps {
  initialSessions: SessionItem[];
}

function getBadgeClass(category: SessionCategory): string {
  switch (category) {
    case "organised":
      return "badge-organised";
    case "abstract":
      return "badge-abstract";
    case "poster":
      return "badge-poster";
    case "capacity":
      return "badge-capacity";
    case "plenary":
      return "badge-plenary";
    case "satellite":
      return "badge-satellite";
    default:
      return "badge-organised";
  }
}

export default function ScheduleClient({ initialSessions }: ScheduleClientProps) {
  const [sessions] = useState<SessionItem[]>(initialSessions);
  const [activeDay, setActiveDay] = useState<string>("all");
  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const day1Count = useMemo(
    () => sessions.filter((s) => s.day === "Day 1").length,
    [sessions]
  );
  const day2Count = useMemo(
    () => sessions.filter((s) => s.day === "Day 2").length,
    [sessions]
  );

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      if (activeDay !== "all" && session.day !== activeDay) return false;
      if (activeType !== "all" && session.category !== activeType) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const haystack = [
          session.title,
          session.subtitle || "",
          session.typeLabel,
          session.lead,
          session.location,
          ...(session.contributors || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [sessions, activeDay, activeType, searchQuery]);

  const resetFilters = () => {
    setActiveDay("all");
    setActiveType("all");
    setSearchQuery("");
  };

  const daysOrder = ["Day 1", "Day 2", "Day 3"];

  return (
    <main className="schedule-section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Programme &amp; Sessions</div>
            <h2 className="section-title">Explore STOP-NCD Sessions at HSR 2026</h2>
          </div>
          <button
            type="button"
            className="print-btn"
            onClick={() => window.print()}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print / Save PDF
          </button>
        </div>

        {/* Interactive Filter Toolbar */}
        <div className="toolbar" role="region" aria-label="Schedule filters">
          <div className="day-tabs" role="tablist" aria-label="Filter by symposium day">
            <button
              type="button"
              className={`day-tab ${activeDay === "all" ? "active" : ""}`}
              onClick={() => setActiveDay("all")}
              role="tab"
              aria-selected={activeDay === "all"}
            >
              All Days (7–8 Dec)
              <span className="day-tab-count">{sessions.length}</span>
            </button>
            <button
              type="button"
              className={`day-tab ${activeDay === "Day 1" ? "active" : ""}`}
              onClick={() => setActiveDay("Day 1")}
              role="tab"
              aria-selected={activeDay === "Day 1"}
            >
              Day 1 · Mon 7 Dec
              <span className="day-tab-count">{day1Count}</span>
            </button>
            <button
              type="button"
              className={`day-tab ${activeDay === "Day 2" ? "active" : ""}`}
              onClick={() => setActiveDay("Day 2")}
              role="tab"
              aria-selected={activeDay === "Day 2"}
            >
              Day 2 · Tue 8 Dec
              <span className="day-tab-count">{day2Count}</span>
            </button>
          </div>

          <div className="filters-row">
            <div className="type-pills" role="group" aria-label="Filter by session type">
              <span className="filter-label">Session Type:</span>
              <button
                type="button"
                className={`type-pill ${activeType === "all" ? "active" : ""}`}
                onClick={() => setActiveType("all")}
              >
                All Types
              </button>
              <button
                type="button"
                className={`type-pill ${activeType === "organised" ? "active" : ""}`}
                onClick={() => setActiveType("organised")}
              >
                Organised Session
              </button>
              <button
                type="button"
                className={`type-pill ${activeType === "abstract" ? "active" : ""}`}
                onClick={() => setActiveType("abstract")}
              >
                Oral presentation
              </button>
              <button
                type="button"
                className={`type-pill ${activeType === "poster" ? "active" : ""}`}
                onClick={() => setActiveType("poster")}
              >
                Poster
              </button>
            </div>

            <div className="search-and-toggle">
              <div className="search-box">
                <svg
                  className="search-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search speaker, title, room..."
                  aria-label="Search sessions by speaker, title, or room"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Schedule Output */}
        <div id="scheduleContainer">
          {filteredSessions.length === 0 ? (
            <div className="empty-state">
              <h3>No sessions match your current filters</h3>
              <p>
                Try clearing your search query or switching back to All Days and All
                Types.
              </p>
              <button type="button" className="reset-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            daysOrder.map((dayKey) => {
              const daySessions = filteredSessions.filter((s) => s.day === dayKey);
              if (daySessions.length === 0) return null;

              const dayTitle = daySessions[0].dayTitle;

              return (
                <div className="day-group" key={dayKey}>
                  <div className="day-banner">
                    <h3 className="day-banner-title">{dayTitle}</h3>
                    <span className="day-banner-sub">
                      {daySessions.length}{" "}
                      {daySessions.length === 1 ? "Session" : "Sessions"}
                    </span>
                  </div>
                  <div className="sessions-list">
                    {daySessions.map((session) => {
                      const badgeClass = getBadgeClass(session.category);
                      const hasPeople =
                        Boolean(session.lead) ||
                        (session.contributors && session.contributors.length > 0);

                      return (
                        <article
                          key={session.id || `${session.day}-${session.time}-${session.title}`}
                          className="session-card"
                          data-category={session.category}
                        >
                          <div className="session-time-col">
                            <div className="session-time">
                              <svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <span>{session.time}</span>
                            </div>
                            <div className="session-location">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              <span>{session.location}</span>
                            </div>
                          </div>

                          <div className="session-main">
                            <div className="session-badges">
                              <span className={`badge ${badgeClass}`}>
                                {session.typeLabel}
                              </span>
                              <span className="badge badge-stopncd">STOP-NCD</span>
                            </div>

                            <h4 className="session-title">{session.title}</h4>
                            {session.subtitle && (
                              <div className="session-subtitle">
                                {session.subtitle}
                              </div>
                            )}

                            {hasPeople && (
                              <div className="session-people">
                                {session.lead && (
                                  <div>
                                    <div className="person-group-label">
                                      Session Lead / Presenter
                                    </div>
                                    <div className="person-list person-lead">
                                      {session.lead}
                                    </div>
                                  </div>
                                )}
                                {session.contributors &&
                                  session.contributors.length > 0 && (
                                    <div>
                                      <div className="person-group-label">
                                        Contributors &amp; Speakers
                                      </div>
                                      <div className="contributor-tags">
                                        {session.contributors.map((c, idx) => (
                                          <span
                                            className="contributor-tag"
                                            key={`${c}-${idx}`}
                                          >
                                            {c}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
