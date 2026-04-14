import { useEffect, useState } from "react";
import "./studentDashboard.css";
import { apiFetch } from "../../utils/apiFetch";
import { useAuth } from "@/context/AuthContext";

export default function StudentDashboard() {
  const { logout, user } = useAuth();

  const [leaderboard, setLeaderboard] = useState([]);
  const [results, setResults] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [courseId, setCourseId] = useState(null);
  

  useEffect(() => {
  const fetchCourse = async () => {
    try {
      const res = await apiFetch("/api/student/my-courses", {}, logout);
      const data = await res.json();
      console.log("Enrolled courses:", data);

      if (data.length === 0) {
        console.warn("No enrolled courses found");
        return;
      }

      // 👉 pick latest course (already ordered DESC)
      setCourseId(data[0].id);

    } catch (err) {
      console.error(err);
    }
  };

  fetchCourse();
}, [logout]);

  useEffect(() => {
    if (!courseId) return; // 🚨 IMPORTANT
    
    const fetchData = async () => {
      try {
        const lbRes = await apiFetch(
          `/api/student/leaderboard/${courseId}`,
          {},
          logout
        );
        const lbData = await lbRes.json();

        const sorted = [...lbData].sort(
          (a, b) => b.total_score - a.total_score
        );

        const ranked = sorted.map((u, i) => ({
          ...u,
          rank: i + 1,
          current: u.id === user.id,
        }));

        setLeaderboard(ranked);

        const resRes = await apiFetch(
          `/api/student/my-results/${courseId}`,
          {},
          logout
        );
        const resData = await resRes.json();

        setResults(resData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [courseId, logout, user]);

  const currentUser = leaderboard.find((u) => u.current);

  const overallPercent = currentUser?.percentage || 0;
  const currentRank = currentUser?.rank || "-";

  const testPerformance = results.map((r) =>
    r.total_max ? Math.round((r.total_score / r.total_max) * 100) : 0
  );

  const avg = (key, maxKey) => {
    if (!results.length) return 0;

    const total = results.reduce((sum, r) => sum + (r[key] || 0), 0);
    const max = results.reduce((sum, r) => sum + (r[maxKey] || 0), 0);

    return max ? Math.round((total / max) * 100) : 0;
  };

  const modules = [
    { name: "Lesen", val: avg("lesen", "lesen_max") },
    { name: "Hören", val: avg("hoeren", "hoeren_max") },
    { name: "Schreiben", val: avg("schreiben", "schreiben_max") },
    { name: "Sprechen", val: avg("sprechen", "sprechen_max") },
  ];

  return (
    <div className="dashboard">

      {/* TOP */}
      <div className="top-cards">
        <div className="card purple">
          <h4>Overall Score</h4>
          <h1>{overallPercent}%</h1>
        </div>

        <div className="card blue">
          <h4>Current Rank</h4>
          <h1>#{currentRank}</h1>
        </div>
      </div>

      {/* GRID */}
      <div className="dashboard-grid">

        {/* LEFT - LEADERBOARD */}
        <div className="left">
          <div className={`glass-card leaderboard ${showAll ? "expanded" : ""}`}>
            <h2>🏆 Leaderboard</h2>

            {(showAll ? leaderboard : leaderboard.slice(0, 4)).map((u) => (
              <div
                className={`row ${u.current ? "active" : ""}`}
                key={u.id}
              >
                <div className="rank">{u.rank}</div>

                <div className="info">
                  <div className="name">{u.full_name}</div>

                  <div className="bar">
                    <div
                      className="fill"
                      style={{ width: `${Math.min(u.percentage, 100)}%` }}
                    >
                      <span className="bar-text">
                        {u.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="percent">
                  {u.total_score}/{u.total_max}
                </div>
              </div>
            ))}

            {/* TOGGLE BUTTON */}
            {leaderboard.length > 4 && (
              <div className="toggle-btn-wrapper">
                <button
                  className="toggle-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less ↑" : "See All ↓"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">

          <div className="glass-card">
            <h3>📊 Test Performance</h3>

            {testPerformance.map((val, i) => (
              <div className="progress-item" key={i}>
                <div className="progress-header">
                  <span>Test {i + 1}</span>
                  <span>{val}%</span>
                </div>

                <div className="bar small">
                  <div
                    className="fill"
                    style={{ width: `${val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card">
            <h3>🧠 Module Skills</h3>

            {modules.map((m, i) => (
              <div className="progress-item" key={i}>
                <div className="progress-header">
                  <span>{m.name}</span>
                  <span>{m.val}%</span>
                </div>

                <div className="bar small">
                  <div
                    className="fill"
                    style={{ width: `${m.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}