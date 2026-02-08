import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/layout.css";
import "../styles/login.css";

export default function ForgotPassword() {
    
    const [email, setEmail] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        alert(`Reset link will be sent to: ${email}`);
    }

    return(

        <section className="section">
        <div className="container_login">
            <div className="login_card">
            <h1 className="login_title">Forgot password</h1>
            <p className="login_subtitle">
                Enter your email and we will send a reset link.
            </p>

            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                />
                </div>

                <button className="btn_primary" type="submit">
                Send reset link
                </button>

                <div className="loginLinks">
                <Link className="link" to="/login">Back to login</Link>
                <Link className="link" to="/register">Create account</Link>
                </div>
            </form>
            </div>
        </div>
        </section>

    )
}