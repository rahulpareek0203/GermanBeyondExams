import "../styles/layout.css";
import "../styles/login.css";
import "../styles/globals.css";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true)

        try {
            
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: { "Content-type": "application/json"   },
                body: JSON.stringify({
                    email, password         // see in backend we get these values using req.body
                })
            })

            const data = await res.json()
            console.log("----> message from frontend:", data)

            if(!res.ok){
                setMessage(data.message || "❌ Login failed");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user))
            console.log("----> message from frontend for JWT:", data.token)


            setMessage("✅ Login successful!");
            setLoading(false);
            

            // redirect after login
            setTimeout(() => navigate("/"), 500);

        } catch (error) {
            setMessage("❌ Network error: backend not reachable.");
            setLoading(false);
        }
    }
    return(
        <section className="section">
            <div className="container_login">
                <div className="login_card">
                    <h1 className="login_title"> Login Page </h1>
                    <p className="login_subtitle"> Access your German Beyond Exams Account </p>
                </div>

                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" placeholder="Enter your Email..." 
                                value={email} onChange={(e) => setEmail(e.target.value)} required 
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password"> Password </label>
                        <input type="password" id="password" placeholder="Enter your Password..." 
                                value={password} onChange={(e) => setPassword(e.target.value)} required 
                        />
                    </div>    

                    {message}

                    <button className="btn_primary" type="submit" disabled = {loading}>
                        {loading? "Loggin in...": "Login"}
                    </button>          

                    <div className="loginLinks">
                        <Link className="link" to="/forgot-password"> Forgot your Password? </Link>
                        <Link className="link" to="/register"> Create Account </Link>
                    </div>
                
                </form>

            </div>

        </section>

    )
}