

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { apiFetch } from "@/utils/apiFetch";

// /* =============================
//    Verify Icon
// ============================= */
// const VerifyIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="14"
//     height="14"
//     viewBox="0 0 48 48"
//   >
//     <polygon
//       fill="#42a5f5"
//       points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
//     />
//     <polygon
//       fill="#fff"
//       points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
//     />
//   </svg>
// );

// /* =============================
//    Review Card
// ============================= */
// const ReviewCard = ({ review }) => {
//   return (
//     <a
//       href={`https://instagram.com/${review.instagram_handle}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="p-6 mx-4 w-80 shrink-0 rounded-2xl
//                  bg-white/5 backdrop-blur-lg
//                  border border-white/10
//                  shadow-lg hover:shadow-xl
//                  transition-all duration-300"
//     >
//       <div className="flex gap-3 items-center">
//         <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
//           {review.full_name?.charAt(0)}
//         </div>

//         <div className="flex flex-col">
//           <div className="flex items-center gap-1">
//             <p className="font-medium text-white">
//               {review.full_name}
//             </p>
//             <VerifyIcon />
//           </div>

//           <span className="text-xs text-gray-400">
//             @{review.instagram_handle}
//           </span>
//         </div>
//       </div>

//       <p className="text-sm pt-4 text-gray-300 leading-relaxed">
//         {review.review_text}
//       </p>
//     </a>
//   );
// };

// /* =============================
//    Marquee Row (MASK VERSION)
// ============================= */
// function MarqueeRow({ data, reverse = false, speed = 25 }) {
//   const doubled = useMemo(() => [...data, ...data], [data]);

//   return (
//     <div className="relative w-full overflow-hidden">
//       <div
//         className="flex min-w-[200%] py-6"
//         style={{
//           animation: `marqueeScroll ${speed}s linear infinite`,
//           animationDirection: reverse ? "reverse" : "normal",
//           WebkitMaskImage:
//             "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
//           maskImage:
//             "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
//         }}
//       >
//         {doubled.map((review, i) => (
//           <ReviewCard key={review.id + "-" + i} review={review} />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* =============================
//    Main Reviews Section
// ============================= */
// export default function Reviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await apiFetch("/api/reviews");
//         if (!res) return;
//         const data = await res.json();
//         setReviews(data);
//         console.log("fetched reviews", data)
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center py-24 text-white">
//         Loading reviews...
//       </div>
//     );
//   }

//   if (!loading && reviews.length === 0) {
//     return (
//       <div className="text-center py-24 text-white">
//         No reviews yet.
//       </div>
//     );
//   }

//   const mid = Math.ceil(reviews.length / 2);
//   const row1 = reviews.slice(0, mid);
//   const row2 = reviews.slice(mid);

//   return (
//     <section className="py-24">
//       <style>{`
//         @keyframes marqueeScroll {
//           0% { transform: translateX(0%); }
//           100% { transform: translateX(-50%); }
//         }
//       `}</style>

//       <div className="text-center mb-14 px-4">
//         <h1 className="text-4xl font-bold text-white">
//           What our students say
//         </h1>
//         <p className="text-gray-400 mt-4">
//           Real feedback from real learners.
//         </p>
//       </div>

//       <div className="flex flex-col gap-8">
//         <MarqueeRow data={row1} reverse={false} speed={30} />
//         <MarqueeRow data={row2} reverse={true} speed={35} />
//       </div>
//     </section>
//   );
// }




"use client";

import React, { useMemo } from "react";

/* =============================
   SAMPLE DATA (10 Reviews)
============================= */
const SAMPLE_REVIEWS = [
  {
    id: 1,
    full_name: "Rahul Sharma",
    instagram_handle: "rahulxsharma",
    review_text:
      "Sir the way you explain German in Hindi is honestly amazing. Even difficult grammar topics feel so simple now.",
  },
  {
    id: 2,
    full_name: "Ayesha Khan",
    instagram_handle: "ayeshak_97",
    review_text:
      "I was always scared of German cases, but you explained them so beautifully that everything finally makes sense.",
  },
  {
    id: 3,
    full_name: "Arjun Verma",
    instagram_handle: "arjunv__",
    review_text:
      "Your teaching style is very clear and structured. Complex topics become very easy when you explain them.",
  },
  {
    id: 4,
    full_name: "Fatima Ali",
    instagram_handle: "fatimaali_official",
    review_text:
      "The best part is that you explain German grammar in Hindi. It helps so much in understanding deeply.",
  },
  {
    id: 5,
    full_name: "Imran Ahmed",
    instagram_handle: "imranahmed786",
    review_text:
      "I tried learning German before but always got confused. After your explanations, everything feels clear.",
  },
  {
    id: 6,
    full_name: "Sneha Patel",
    instagram_handle: "snehapatel._",
    review_text:
      "You make even the most difficult concepts like Akkusativ and Dativ so easy to understand.",
  },
  {
    id: 7,
    full_name: "Bilal Hussain",
    instagram_handle: "bilal.hussain92",
    review_text:
      "Your examples are very practical and easy to relate to. German never felt this simple before.",
  },
  {
    id: 8,
    full_name: "Priya Mehta",
    instagram_handle: "priya.mehta_",
    review_text:
      "The way you break down each topic step by step is honestly beautiful. I finally understand German properly.",
  },
  {
    id: 9,
    full_name: "Hassan Raza",
    instagram_handle: "hassanraza.official",
    review_text:
      "You explain everything in such a calm and clear way. Even tough grammar feels manageable now.",
  },
  {
    id: 10,
    full_name: "Neha Kapoor",
    instagram_handle: "neha.kapoorx",
    review_text:
      "Because you teach in Hindi, I never feel lost. German feels much easier and more interesting now.",
  },
];

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
const ReviewCard = ({ review }) => (
  <a
    href={`https://instagram.com/${review.instagram_handle}`}
    target="_blank"
    rel="noopener noreferrer"
    className="p-6 mx-4 w-80 shrink-0 rounded-2xl
               bg-white/5 backdrop-blur-lg
               border border-white/10
               shadow-lg hover:shadow-xl
               transition-all duration-300"
  >
    <div className="flex gap-3 items-center">
      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
        {review.full_name.charAt(0)}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="font-medium text-white">{review.full_name}</p>
          <VerifyIcon />
        </div>
        <span className="text-xs text-gray-400">@{review.instagram_handle}</span>
      </div>
    </div>

    <p className="text-sm pt-4 text-gray-300 leading-relaxed">
      {review.review_text}
    </p>
  </a>
);

/* =============================
   Marquee Row
============================= */
function MarqueeRow({ data, reverse = false, speed = 25 }) {
  const doubled = useMemo(() => [...data, ...data], [data]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex min-w-[200%] py-6"
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={review.id + "-" + i} review={review} />
        ))}
      </div>
    </div>
  );
}

/* =============================
   Main Component
============================= */
export default function Reviews() {
  const mid = Math.ceil(SAMPLE_REVIEWS.length / 2);
  const row1 = SAMPLE_REVIEWS.slice(0, mid);
  const row2 = SAMPLE_REVIEWS.slice(mid);

  return (
    <section className="py-10">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="text-center mb-14 px-4">
        <h1 className="text-4xl font-bold text-white">
          What our students say
        </h1>
        <p className="text-gray-400 mt-4">
          Real feedback from real learners.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <MarqueeRow data={row1} reverse={false} speed={30} />
        <MarqueeRow data={row2} reverse={true} speed={35} />
      </div>
    </section>
  );
}