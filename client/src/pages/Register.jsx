import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { LampContainer } from "@/components/ui/LampBackground";
import { motion } from "framer-motion";


const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        
        setMessage("")
        setLoading(true)

        try {
            const res = await fetch(`${API}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name : name,
                    email: email,
                    password: password
                })
            })

            const data = await res.json()
            console.log(data)

            if(!res.ok){
                setMessage(data.message || "Registration Failed !!!")
                setLoading(false)
                return
            }

            setMessage("✅ Account created successfully! Please login.");
            setLoading(false);

            // Optionally redirect to login after success
            setTimeout(() => navigate("/login"), 800);
        
        } catch (error) {
            setMessage("❌ Network error: backend not reachable.");
            setLoading(false);
        }
    }

    return (
  <section className="relative bg-slate-950 px-6">
    <LampContainer>
      <div className="relative z-50 w-full max-w-md">

        {/* Modern Glass Card */}
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="border border-white/10 rounded-2xl shadow-2xl p-8"
        >

          <h1 className="text-3xl font-semibold text-white text-center">
            Create Account
          </h1>

          <p className="text-slate-400 text-center mt-2 mb-6">
            Join German Beyond Exams Community
          </p>

          {message && (
            <div className={`mt-4 text-sm text-center px-4 py-2 rounded-lg ${
                message.includes("successfully")
                ? "bg-green-500/10 text-green-400 border border-green-500/30"
                : "bg-red-500/10 text-red-400 border border-red-500/30"
            }`}>
                {message}
            </div>
        )}

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Name
              </label>
              <input
                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Set your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-all py-2.5 font-semibold text-black"
            >
              Create Account
            </button>

          </form>

          <div className="text-center mt-6 text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </div>

        </motion.div>

      </div>
    </LampContainer>
  </section>
);




}