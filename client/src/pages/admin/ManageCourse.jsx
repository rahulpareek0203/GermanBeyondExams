import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./manageCourse.css";
import { apiFetch } from "@/utils/apiFetch";
import { useAuth } from "@/context/AuthContext";

export default function ManageCourse() {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { logout } = useAuth();

  useEffect(() => {
    const fetchMaterials = async () => {
        try {
        const res = await apiFetch(
            `/api/admin/materials/${courseId}`,
            { method: "GET" },
            logout
        );

        const data = await res.json()
        setMaterials(Array.isArray(data) ? data : []);
        } catch (err) {
        console.error("Error fetching materials:", err);
        }
    };

    fetchMaterials();
    }, [courseId]);

    const handleDelete = async (materialId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this material?"
        );

        if (!confirmDelete) return;

        try {
            await apiFetch(
            `/api/admin/materials/${materialId}`,
            { method: "DELETE" },
            logout
            );

            setMaterials(prev =>
            prev.filter(item => item.id !== materialId)
            );

        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

  return (
    <div className="admin-page">

      <div className="page-header">
        <h1>Manage Materials</h1>
        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Material
        </button>
      </div>

        
      <div className="glass-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Class Recording</th>
              <th>Notes</th>
              <th>Homework</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {materials.length === 0 && (
                <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                    No materials added yet.
                    </td>
                </tr>
            )}
            {materials.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{new Date(item.material_date).toLocaleDateString("en-GB")}</td>
                <td>{item.class_recording_link ? "✔" : "-"}</td>
                <td>{item.notes_link ? "✔" : "-"}</td>
                <td>{item.homework_link ? "✔" : "-"}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    >
                    Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddMaterialModal
          courseId={courseId}
          close={() => setShowModal(false)}
          refresh={setMaterials}
        />
      )}

    </div>
  );
}

function AddMaterialModal({ courseId, close, refresh }) {
  const [form, setForm] = useState({
    title: "",
    material_date: "",
    class_recording_link: "",
    notes_link: "",
    homework_link: ""
  });

  const { logout } = useAuth();

  const convertDriveLink = (url) => {
    if (!url) return "";

    // Extract file ID
    const match = url.match(/\/d\/([^/]+)/);

    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }

    return url; // fallback if not drive link
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedForm = {
      ...form,
      class_recording_link: convertDriveLink(form.class_recording_link),
      notes_link: convertDriveLink(form.notes_link),
      homework_link: convertDriveLink(form.homework_link),
    };

    const res = await apiFetch(
      `/api/admin/materials/${courseId}`,
      {
        method: "POST",
        body: JSON.stringify(formattedForm)
      },
      logout
    );

    const data = await res.json();

    refresh(prev => [...prev, data]);
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Add Material</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            onChange={e =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <input
            type="date"
            onChange={e =>
              setForm({ ...form, material_date: e.target.value })
            }
            required
          />

          <input
            placeholder="Class Recording Link"
            onChange={e =>
              setForm({ ...form, class_recording_link: e.target.value })
            }
          />

          <input
            placeholder="Notes Link"
            onChange={e =>
              setForm({ ...form, notes_link: e.target.value })
            }
          />

          <input
            placeholder="Homework Link"
            onChange={e =>
              setForm({ ...form, homework_link: e.target.value })
            }
          />

          <div className="modal-actions">
            <button type="button" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}