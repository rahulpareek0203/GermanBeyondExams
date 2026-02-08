import "../styles/navbar.css";
import "../styles/layout.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
  
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <div className="brand">
          <div className="brand__logo">G</div>
          <span>German Beyond Exams</span>
        </div>

        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>

          <button
            className="btn btn--secondary"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
