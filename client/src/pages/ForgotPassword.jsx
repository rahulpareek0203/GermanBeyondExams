// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/layout.css";
// import "../styles/login.css";

// export default function ForgotPassword() {
    
//     const [email, setEmail] = useState("");
//     function handleSubmit(e) {
//         e.preventDefault();
//         alert(`Reset link will be sent to: ${email}`);
//     }

//     return(

//         <section className="section">
//         <div className="container_login">
//             <div className="login_card">
//             <h1 className="login_title">Forgot password</h1>
//             <p className="login_subtitle">
//                 Enter your email and we will send a reset link.
//             </p>

//             <form className="loginForm" onSubmit={handleSubmit}>
//                 <div className="formGroup">
//                 <label htmlFor="email">Email</label>
//                 <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="you@example.com"
//                     required
//                 />
//                 </div>

//                 <button className="btn_primary" type="submit">
//                 Send reset link
//                 </button>

//                 <div className="loginLinks">
//                 <Link className="link" to="/login">Back to login</Link>
//                 <Link className="link" to="/register">Create account</Link>
//                 </div>
//             </form>
//             </div>
//         </div>
//         </section>

//     )
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/Lamp"; // adjust path if needed

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Reset link will be sent to: ${email}`);
  }

  return (
  <LampContainer>

    <motion.div
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto"
    >

      <h1 className="text-3xl font-semibold text-white text-center">
        Forgot Password
      </h1>

      <p className="text-slate-400 text-center mt-2 mb-6">
        Enter your email and we will send a reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            required
            className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-all py-2.5 font-semibold text-black"
        >
          Send Reset Link
        </button>

        <div className="text-center mt-6 text-sm text-slate-400">
          <Link
            to="/login"
            className="text-cyan-400 hover:underline mr-4"
          >
            Back to Login
          </Link>

          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Create Account
          </Link>
        </div>

      </form>

    </motion.div>

  </LampContainer>
);

}
