import { useEffect, useState } from "react";
import "./leaderBoard.css";
import { apiFetch } from "../../utils/apiFetch.js";
import { useAuth } from "@/context/AuthContext";

export default function AdminAddResult() {
  const { logout } = useAuth();

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    course_id: "",
    course_title: "",
    exam_id: "",
    lesen: "",
    lesen_max: 15,
    hoeren: "",
    hoeren_max: 15,
    schreiben: "",
    schreiben_max: "",
    sprechen: "",
    sprechen_max: "",
  });

  /* ===============================
     FETCH STUDENTS
  =============================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFetch("/api/admin/enrollments", {}, logout);
        const data = await res.json();

        const approved = data.filter((s) => s.status === "approved");
        setStudents(approved);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [logout]);

  useEffect(() => {
    const fetchExisting = async () => {
        if (!form.user_id || !form.exam_id) return;

        try {
        const res = await apiFetch(
            `/api/admin/exam-results/${form.user_id}/${form.exam_id}`,
            {},
            logout
        );

        if (!res.ok) return;

        const data = await res.json();

        setForm((prev) => ({
            ...prev,

            lesen: data.lesen ?? "",
            lesen_max: data.lesen_max ?? 15,

            hoeren: data.hoeren ?? "",
            hoeren_max: data.hoeren_max ?? 15,

            schreiben: data.schreiben ?? "",
            schreiben_max: data.schreiben_max ?? 15,

            sprechen: data.sprechen ?? "",
            sprechen_max: data.sprechen_max ?? 15,
        }));

        } catch (err) {
        console.error(err);
        }
    };

  fetchExisting();
}, [form.user_id, form.exam_id]);

  /* ===============================
     HANDLE INPUT
  =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user_id") {
      const student = students.find((s) => s.user_id === value);

      setForm((prev) => ({
        ...prev,
        user_id: value,
        course_id: student?.course_id || "",
        course_title: student?.course_title || "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ===============================
     CALCULATIONS
  =============================== */
  const totalObtained =
    Number(form.lesen || 0) +
    Number(form.hoeren || 0) +
    Number(form.schreiben || 0) +
    Number(form.sprechen || 0);

  const totalMax =
    Number(form.lesen_max || 0) +
    Number(form.hoeren_max || 0) +
    Number(form.schreiben_max || 0) +
    Number(form.sprechen_max || 0);

  const percentage = totalMax
    ? ((totalObtained / totalMax) * 100).toFixed(1)
    : 0;

  const clean = (val) => (val === "" ? null : Number(val));

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting:", form); // 🔥 debug

      const res = await apiFetch(
        "/api/admin/exam-results",
        {
          method: "POST",
          body: JSON.stringify({
            user_id: form.user_id,
            course_id: form.course_id,
            exam_id: form.exam_id,

            lesen: clean(form.lesen),
            lesen_max: clean(form.lesen_max),

            hoeren: clean(form.hoeren),
            hoeren_max: clean(form.hoeren_max),

            schreiben: clean(form.schreiben),
            schreiben_max: clean(form.schreiben_max),

            sprechen: clean(form.sprechen),
            sprechen_max: clean(form.sprechen_max),

            total_score: totalObtained,
            total_max: totalMax,
            percentage,
          }),
        },
        logout
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      alert("✅ Result saved successfully!");

      /* RESET */
      setForm({
        user_id: "",
        course_id: "",
        course_title: "",
        exam_id: "",
        lesen: "",
        lesen_max: 15,
        hoeren: "",
        hoeren_max: 15,
        schreiben: "",
        schreiben_max: "",
        sprechen: "",
        sprechen_max: "",
      });

    } catch (err) {
      console.error(err);
      alert("❌ Error saving result");
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="exam-result-container">
      <div className="exam-result-card">
        <form className="exam-result-form" onSubmit={handleSubmit}>

          {/* 🔹 SELECTION */}
          <div className="exam-result-section">
            <h4>Selection</h4>

            <div className="exam-result-select-row">

              {/* STUDENT */}
              <div className="exam-result-input-group">
                <label>Student</label>
                <select
                  name="user_id"
                  value={form.user_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((s) => (
                    <option key={s.user_id} value={s.user_id}>
                      {s.full_name} ({s.course_title})
                    </option>
                  ))}
                </select>
              </div>

              {/* COURSE */}
              <div className="exam-result-input-group">
                <label>Course</label>
                <input
                  type="text"
                  disabled
                  value={form.course_title || ""}
                />
              </div>

              {/* EXAM NAME */}
              <div className="exam-result-input-group">
                <label>Test Name</label>
                <input
                  type="text"
                  name="exam_id"
                  placeholder="e.g. A2-Test-1"
                  value={form.exam_id}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </div>

          {/* 🔹 SCORES */}
          <div className="exam-result-section">
            <h4>Scores</h4>

            <div className="exam-result-marks-grid">
              {[
                ["Lesen", "lesen"],
                ["Hören", "hoeren"],
                ["Schreiben", "schreiben"],
                ["Sprechen", "sprechen"],
              ].map(([label, key]) => (
                <div className="exam-result-input-group" key={key}>
                  <label>{label}</label>

                  <div className="exam-result-dual-input">
                    <input
                      name={key}
                      type="number"
                      placeholder="Score"
                      value={form[key]}
                      onChange={handleChange}
                    />
                    <input
                      name={`${key}_max`}
                      type="number"
                      placeholder="Max"
                      value={form[`${key}_max`]  ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔹 TOTAL */}
          <div className="exam-result-total-box">
            <div>
              <span>Total</span>
              <h3>{totalObtained} / {totalMax}</h3>
            </div>

            <div className="exam-result-percentage">
              {percentage}%
            </div>
          </div>

          {/* 🔹 BUTTON */}
          <button type="submit" className="exam-result-btn">
            Save / Update Result
          </button>

        </form>
      </div>
    </div>
  );
}