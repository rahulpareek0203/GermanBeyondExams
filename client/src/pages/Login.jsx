import "../styles/layout.css";
import "../styles/login.css";
import "../styles/globals.css";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Login with data: ${email}`)
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

                    <button className="btn_primary" type="submit">
                        Login
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