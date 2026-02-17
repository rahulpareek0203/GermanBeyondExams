// import "../styles/layout.css";
// import "../styles/login.css";
// import "../styles/globals.css";
// import { useState } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

// export default function Login() {

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const [message, setMessage] = useState("")
//     const [loading, setLoading] = useState(false)

//     const {login} = useAuth()

//     const navigate = useNavigate()

//     async function handleSubmit(e) {
//         e.preventDefault();
//         setMessage("");
//         setLoading(true)

//         try {
            
//             const res = await fetch(`${API}/api/login`, {
//                 method: "POST",
//                 headers: { "Content-type": "application/json"   },
//                 body: JSON.stringify({
//                     email, password         // see in backend we get these values using req.body
//                 })
//             })

//             const data = await res.json()
//             console.log("----> message from frontend:", data)

//             if(!res.ok){
//                 setMessage(data.message || "❌ Login failed");
//                 setLoading(false);
//                 return;
//             }

//             // localStorage.setItem("token", data.token);
//             // localStorage.setItem("user", JSON.stringify(data.user))

//             // instead of doing manual work here we will call "login" method of auth
//             login(data.user, data.token)
//             console.log("----> message from frontend for JWT:", data.token)


//             setMessage("✅ Login successful!");
//             setLoading(false);
            

//             // redirect after login
//             if (data.user.role === "admin") {
//                 setTimeout(() => {
//                     navigate("/admin");
//                 }, 1500); // 1.5 seconds
//             } 
//             else {
//                 setTimeout(() => {
//                     navigate("/dashboard");
//                 }, 1500);
//             }

//         } catch (error) {
//             setMessage("❌ Network error: backend not reachable.");
//             setLoading(false);
//         }
//     }
//     return(
//         <section className="section">
//             <div className="container_login">
//                 <div className="login_card">
//                     <h1 className="login_title"> Login Page </h1>
//                     <p className="login_subtitle"> Access your German Beyond Exams Account </p>
//                 </div>

//                 <form className="loginForm" onSubmit={handleSubmit}>
//                     <div className="formGroup">
//                         <label htmlFor="email"> Email </label>
//                         <input type="email" id="email" placeholder="Enter your Email..." 
//                                 value={email} onChange={(e) => setEmail(e.target.value)} required 
//                         />
//                     </div>

//                     <div className="formGroup">
//                         <label htmlFor="password"> Password </label>
//                         <input type="password" id="password" placeholder="Enter your Password..." 
//                                 value={password} onChange={(e) => setPassword(e.target.value)} required 
//                         />
//                     </div>    

//                     {message}

//                     <button className="btn_primary" type="submit" disabled = {loading}>
//                         {loading? "Loggin in...": "Login"}
//                     </button>          

//                     <div className="loginLinks">
//                         <Link className="link" to="/forgot-password"> Forgot your Password? </Link>
//                         <Link className="link" to="/register"> Create Account </Link>
//                     </div>
                
//                 </form>

//             </div>

//         </section>

//     )
// }



//=============================================


import { Component } from "@/components/login/animated-characters-login-page";

export default function Login() {
  return <Component />;
}
