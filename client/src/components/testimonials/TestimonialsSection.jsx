import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/apiFetch";
import "./testimonial.css";
import { useNavigate } from "react-router-dom";

export default function TestimonialsSection() {
  const { user, logout } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instagram, setInstagram] = useState("");
  const [review, setReview] = useState("");
  const [existingReview, setExistingReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const MAX_WORDS = 50;   
  const MAX_CHARS = 500;  // optional extra safety

  const navigate = useNavigate();

  const validateInstagram = (value) => {
    const regex = /^@?[a-zA-Z0-9._]+$/;
    return regex.test(value);
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
    };

  /* =========================
     CHECK IF USER HAS REVIEW
  ========================= */
  useEffect(() => {
    const fetchMyReview = async () => {
      try {
        console.log("Checking existing review...");

        const res = await apiFetch("/api/reviews/my-review", {}, logout);

        if (!res) {
          alert("Unauthorized. Please login again.");
          return;
        }

        const data = await res.json();

        if (data) {
          console.log("Existing review found:", data);

          setExistingReview(data);
          setInstagram(data.instagram_handle);
          setReview(data.review_text);

        } else {
          console.log("No review found.");
        }

      } catch (err) {
        console.error("Fetch review error:", err);
        alert("Failed to load your review.");
      }
    };

    if (user) fetchMyReview();
  }, [user]);

  /* =========================
     SUBMIT / UPDATE REVIEW
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!instagram || !review) {
      alert("All fields are required.");
      return;
    }

    if (!validateInstagram(instagram)) {
      alert("Enter a valid Instagram handle.");
      return;
    }

    if (review.length < 10) {
      alert("Review must be at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      const method = existingReview ? "PUT" : "POST";
      console.log("Submitting review. Method:", method);

      const cleanedHandle = instagram.replace("@", "").trim();

      const res = await apiFetch(
        "/api/reviews",
        {
          method,
          body: JSON.stringify({
            instagramHandle: cleanedHandle,
            reviewText: review,
          }),
        },
        logout
      );

      if (!res) {
        alert("Session expired. Please login again.");
        return;
      }

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      alert(data.message);

      if (!existingReview) {
        setExistingReview(data.review);
      }

      setIsModalOpen(false);

    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="testimonials-section">
        <h1 className="text-4xl font-bold text-white">
          What our students say
        </h1>
        <p className="text-gray-400 mt-4 mb-4">
          Real feedback from real learners.
        </p>

        {user ? (
            <button className="review-btn" onClick={() => setIsModalOpen(true)}>
                {existingReview ? "Edit Your Review" : "Write a Review"}
            </button>
            ) : (
            <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
                Login to Write a Review
            </button>
        )}

      {/* MODAL */}
        {isModalOpen && (
        <div className="modal-overlay">
            <div className="modal-content">
            <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
            >
                ✕
            </button>

            <form className="review-form" onSubmit={handleSubmit}>
                <h3>
                {existingReview ? "Edit Your Review" : "Write a Review"}
                </h3>

                <div className="form-group">
                <label>Name</label>
                <input value={user?.full_name || ""} disabled />
                </div>

                <div className="form-group">
                <label>Instagram Handle</label>
                <input
                    placeholder="@yourusername"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    required
                />
                </div>

                <div className="form-group textarea-wrapper">
                <label>Your Review</label>

                <textarea
                    placeholder="Write your experience..."
                    value={review}
                    maxLength={MAX_CHARS}
                    onChange={(e) => {
                    const text = e.target.value;
                    if (countWords(text) <= MAX_WORDS) {
                        setReview(text);
                    }
                    }}
                    required
                />

                <div className="word-counter">
                    {countWords(review)} / {MAX_WORDS} words
                </div>
                </div>

                <button type="submit" disabled={loading}>
                {loading
                    ? "Processing..."
                    : existingReview
                    ? "Update Review"
                    : "Submit Review"}
                </button>
            </form>
            </div>
        </div>
        )}
    </section>
  );
}