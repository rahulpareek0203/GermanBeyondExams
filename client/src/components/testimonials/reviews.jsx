
"use client";

import React, { useMemo, useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";

/* =============================
   Verify Icon
============================= */
const VerifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 48 48">
    <polygon
      fill="#42a5f5"
      points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
    />
    <polygon
      fill="#fff"
      points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
    />
  </svg>
);

/* =============================
   Review Card
============================= */
const ReviewCard = ({ review }) => {
  const isLong = review.review_text.length > 180;

  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggle = (e) => {
  e.preventDefault();
  e.stopPropagation();

  setExpanded((prev) => {
    const newState = !prev;

    // 👉 If collapsing, resume marquee
    if (prev === true) {
      const marquees = document.querySelectorAll(".marquee");
      marquees.forEach((el) => el.classList.remove("paused"));
    }

    // 👉 If expanding, pause marquee
    if (prev === false) {
      const marquees = document.querySelectorAll(".marquee");
      marquees.forEach((el) => el.classList.add("paused"));
    }

    return newState;
  });
};

  const handleCardClick = () => {
    if (!isMobile) return; // desktop uses normal link
    if (!expanded) {
      window.open(`https://instagram.com/${review.instagram_handle}`, "_blank");
    }
  };

  return (
    <a
      href={`https://instagram.com/${review.instagram_handle}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleCardClick}
      className={`group p-6 mx-4 w-80 shrink-0 rounded-2xl
        bg-white/5 backdrop-blur-lg
        border border-white/10 shadow-lg
        transition-all duration-500 ease-in-out
        overflow-hidden
        ${
          isMobile
            ? expanded
              ? "h-auto"
              : "h-44"
            : isLong
            ? "h-44 hover:h-72"
            : "h-44"
        }`}
    >
      {/* Header */}
      <div className="flex gap-3 items-center mb-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
          {review.full_name?.charAt(0)}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium text-white text-sm">
              {review.full_name}
            </p>
            <VerifyIcon />
          </div>
          <span className="text-xs text-gray-400">
            @{review.instagram_handle}
          </span>
        </div>
      </div>

      {/* Text */}
      <p
        className={`text-sm text-gray-300 leading-relaxed transition-all duration-500
        ${
          isMobile
            ? !expanded && isLong
              ? "line-clamp-2"
              : ""
            : isLong
            ? "line-clamp-2 group-hover:line-clamp-none"
            : ""
        }`}
      >
        {review.review_text}
      </p>

      {/* Toggle */}
      {isLong && isMobile && (
        <span
          onClick={handleToggle}
          className="text-xs text-purple-400 mt-2 block cursor-pointer"
        >
          {expanded ? "Show less" : "See more..."}
        </span>
      )}

      {/* Desktop hint */}
      {isLong && !isMobile && (
        <span className="text-xs text-purple-400 mt-2 block group-hover:hidden">
          See more...
        </span>
      )}
    </a>
  );
};

/* =============================
   Marquee Row
============================= */
function MarqueeRow({ data, reverse = false, speed = 25 }) {
  const doubled = useMemo(() => [...data, ...data], [data]);

  if (!data.length) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={(e) =>
        e.currentTarget.querySelector(".marquee")?.classList.add("paused")
      }
      onMouseLeave={(e) =>
        e.currentTarget.querySelector(".marquee")?.classList.remove("paused")
      }
    >
      <div
        className="marquee flex min-w-[200%] py-6"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={review._id || review.id + "-" + i} review={review} />
        ))}
      </div>
    </div>
  );
}

/* =============================
   Main Component
============================= */
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiFetch("/api/reviews");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // ✅ Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Dynamic row split (2 desktop / 3 mobile)
  let rows = [];

  if (isMobile) {
    const size = Math.ceil(reviews.length / 3);
    rows = [
      reviews.slice(0, size),
      reviews.slice(size, size * 2),
      reviews.slice(size * 2),
    ];
  } else {
    const size = Math.ceil(reviews.length / 2);
    rows = [
      reviews.slice(0, size),
      reviews.slice(size),
    ];
  }

  return (
    <section id="reviews" className="py-6 md:py-10">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee {
          animation-name: marqueeScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .marquee.paused {
          animation-play-state: paused;
        }
      `}</style>

      {loading && (
        <div className="text-center text-gray-400 py-10">
          Loading reviews...
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No reviews yet.
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <div className="flex flex-col gap-0 md:gap-1">
          {rows.map((row, index) => (
            <MarqueeRow
              key={index}
              data={row}
              reverse={index % 2 !== 0}
              speed={isMobile ? 10 + index * 2 : 30 + index * 10}
            />
          ))}
        </div>
      )}
    </section>
  );
}