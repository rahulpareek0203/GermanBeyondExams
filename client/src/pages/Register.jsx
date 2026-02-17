import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

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

    return(

        <section className="section">
            <div className="container_login">
                <div className="login_card">
                    <h1 className="login_title"> Create Account </h1>
                    <p className="login_subtitle"> Join German Beyond Exams Community </p>
                </div>

                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="name"> Name </label>
                        <input id="name" placeholder="Enter Your Name..." 
                                value={name} onChange={(e) => setName(e.target.value)} required 
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" placeholder="Enter your Email..." 
                                value={email} onChange={(e) => setEmail(e.target.value)} required 
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password"> Password </label>
                        <input type="password" id="password" placeholder="Set your Password..." 
                                value={password} onChange={(e) => setPassword(e.target.value)} required 
                        />
                    </div>    

                    <button className="btn_primary" type="submit">
                        Create Account
                    </button>  


                    <div className="loginLinks">
                        <span className="muted"> Already have an Account? </span>
                        <Link className="link" to="/login"> Login </Link>
                    </div>        
                
                </form>

            </div>

        </section>
    )

}