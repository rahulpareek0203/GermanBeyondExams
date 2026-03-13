import React from "react";
import "./socialConnect.css";

export default function SocialConnect() {
  return (
    <div className="social-wrapper">

      <div className="social-header">
        <h1 className="social-title">
          Connect <span>With Me</span>
        </h1>

        <p className="social-subtitle">
          Stay connected for German learning tips, course updates, and guidance for building your future in Germany.
        </p>
      </div>

      <div className="social-container">

        {/* Instagram */}
        <a
          href="https://www.instagram.com/chartain_/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon instagram"
        >
          <div className="icon-container">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm9.5 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
            </svg>
          </div>
          <span className="icon-label">Instagram</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919462715921"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon whatsapp"
        >
          <div className="icon-container">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.55 2 2.08 6.47 2.08 11.96c0 1.94.51 3.83 1.49 5.49L2 22l4.71-1.53a9.93 9.93 0 0 0 5.33 1.55h.01c5.49 0 9.96-4.47 9.96-9.96C22.01 6.47 17.54 2 12.04 2zm0 18.14a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-2.79.91.91-2.72-.2-.31a8.13 8.13 0 0 1-1.26-4.33c0-4.52 3.67-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2s-3.68 8.2-8.19 8.2zm4.52-6.16c-.25-.13-1.48-.73-1.71-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.12-.12.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.45-.06-.13-.57-1.37-.78-1.87-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.45.06-.68.31-.23.25-.9.88-.9 2.14s.92 2.47 1.05 2.64c.13.17 1.82 2.77 4.41 3.88.62.27 1.1.43 1.47.55.62.2 1.18.17 1.63.1.5-.07 1.48-.61 1.69-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3z"/>
            </svg>
          </div>
          <span className="icon-label">WhatsApp</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/rahulpareek0203"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon github"
        >
          <div className="icon-container">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.8-.26.8-.58v-2.02c-3.34.73-4.03-1.42-4.03-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.46 11.46 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.2.69.8.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
          </div>
          <span className="icon-label">GitHub</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/rahul-pareek-048209205"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon linkedin"
        >
          <div className="icon-container">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45z"/>
            </svg>
          </div>
          <span className="icon-label">LinkedIn</span>
        </a>

      </div>

    </div>
  );
}