// import "../styles/navbar.css";
// import "../styles/layout.css";
// import logo from "../assets/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import { useAuth } from "../context/AuthContext";
// import { LiquidMetalButton } from "@/components/ui/liquid-metal"
// import { ArrowRight } from "lucide-react"



// export default function Navbar() {
  
//   const navigate = useNavigate()
//   const {user, logout} = useAuth()
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef();

//   const [mobileMenu, setMobileMenu] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenu(prev => !prev);
//   };

//   // close the dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if(
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ){
//         setIsOpen(false)
//       }
//     }
  
//     document.addEventListener("mousedown", handleClickOutside)

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   useEffect(() => {
//     setIsOpen(false);
//   }, [user]);
  

//   const handleLogout = () => {
//     logout();          // handled by context
//     navigate("/");     // redirect after logout
//   }

//   const handleProfileClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin/profile");
//     } else {
//       navigate("/dashboard/profile");
//     }
// };
  
//   return (
//     <header className="navbar">
//       <div className="container navbar__inner">
//         <div className="brand" onClick={() => navigate("/")}>
//         <img src={logo} alt="German Beyond Exams Logo" className="brand__logo" />
//         <span className="brand__text">German Beyond Exams</span>
//       </div>


//         <nav className="nav">
//           <Link to="/free-resources" className="nav__link">
//             Free Rosources
//           </Link>

//           <a href="/#reviews" className="nav__link">
//             Reviews
//           </a>

//           <Link to="/vision" className="nav__link">
//             Vision
//           </Link>

//           {!user ? (
//             <button
//               className="btn btn-login"
//               type="button"
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </button>
//           ) : (
//             <div className="profile-wrapper" ref={dropdownRef}>
//                 <button
//                   className="btn btn--secondary"
//                   type="button"
//                   onClick={(e) => {
//                             e.stopPropagation();
//                             setIsOpen(prev => !prev);
//                           }}
//                 >
//                   Profile ▾
//                 </button>

//                 {isOpen && (
//                   <div className="profile-dropdown">

//                     {/* TOP USER SECTION */}
//                     <div className="nav-profile-header">
//                       <div className="avatar_navbar">
//                         {user.full_name.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="user-info">
//                         <div className="user-name">{user.full_name}</div>
//                         <div className="user-email">{user.email}</div>
//                       </div>
//                     </div>

//                     <div className="dropdown-divider" />

//                     {/* MENU ITEMS */}
//                     <button onClick={handleProfileClick}>
//                       Profile Info
//                     </button>

//                     <button >
//                       Settings
//                     </button>

//                     <button onClick={() => navigate("/dashboard")}>
//                       Dashboard
//                     </button>

//                     <button >
//                       Help
//                     </button>

//                     <div className="dropdown-divider" />

//                     <LiquidMetalButton
//                       size= "sm"
//                       borderWidth={6}
//                       icon={<ArrowRight className="w-4 h-4" />}
//                       metalConfig={{
//                         colorBack: "#acc8f5",
//                         colorTint: "#e9cf5b",
//                       }}
//                       onClick={handleLogout}
//                     >
//                       Log Out
//                     </LiquidMetalButton>

//                   </div>
//                 )}


//             </div>
            
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }






import "../styles/navbar.css";
import "../styles/layout.css";
import logo from "../assets/logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { ArrowRight } from "lucide-react";

export default function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dropdownRef = useRef();

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user?.role === "admin") {
      navigate("/admin/profile");
    } else {
      navigate("/dashboard/profile");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  return (
    <>
      <header className="navbar">
        <div className="container navbar__inner">

          {/* LOGO */}
          <div className="brand" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="German Beyond Exams Logo"
              className="brand__logo"
            />
            <span className="brand__text">German Beyond Exams</span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="nav">

            <Link to="/free-resources" className="nav__link">
              Free Resources
            </Link>

            <a href="/#reviews" className="nav__link">
              Reviews
            </a>

            <Link to="/vision" className="nav__link">
              Vision
            </Link>

            {!user ? (
              <button
                className="btn btn-login"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <div className="profile-wrapper" ref={dropdownRef}>

                <button
                  className="btn btn--secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                  }}
                >
                  Profile ▾
                </button>

                {isOpen && (
                  <div className="profile-dropdown">

                    {/* PROFILE HEADER */}
                    <div className="nav-profile-header">

                      <div className="avatar_navbar">
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>

                      <div className="user-info">
                        <div className="user-name">{user.full_name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>

                    </div>

                    <div className="dropdown-divider" />

                    {/* MENU ITEMS */}
                    <button onClick={handleProfileClick}>
                      Profile Info
                    </button>

                    <button>Settings</button>

                    <button onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </button>

                    <button>Help</button>

                    <div className="dropdown-divider" />

                    <LiquidMetalButton
                      size="sm"
                      borderWidth={6}
                      icon={<ArrowRight className="w-4 h-4" />}
                      metalConfig={{
                        colorBack: "#acc8f5",
                        colorTint: "#e9cf5b",
                      }}
                      onClick={handleLogout}
                    >
                      Log Out
                    </LiquidMetalButton>

                  </div>
                )}
              </div>
            )}
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            className={`hamburger_navbar ${mobileMenu ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <span className="line_navbar"></span>
            <span className="line_navbar"></span>
            <span className="line_navbar"></span>
          </button>

        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div className={`mobile-sidebar ${mobileMenu ? "open" : ""}`}>

      {/* USER HEADER */}
      {user && (
        <>
          <div className="nav-profile-header">

            <div className="avatar_navbar">
              {user.full_name.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <div className="user-name">{user.full_name}</div>
              <div className="user-email">{user.email}</div>
            </div>

          </div>

          <div className="dropdown-divider" />
        </>
      )}

      {/* MAIN PAGES */}
      <Link to="/free-resources" onClick={toggleMobileMenu}>
        Free Resources
      </Link>

      <a href="/#reviews" onClick={toggleMobileMenu}>
        Reviews
      </a>

      <Link to="/vision" onClick={toggleMobileMenu}>
        Vision
      </Link>

    {/* USER OPTIONS */}
    {user && (
      <>
        <div className="dropdown-divider" />

        <button className="user-action" onClick={handleProfileClick}>
          Profile Info
        </button>

        <button className="user-action">
          Settings
        </button>

        <button className="user-action" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button className="user-action">
          Help
        </button>
      </>
    )}

  <div className="dropdown-divider" />

  {/* LOGIN / LOGOUT BUTTON */}
  {user ? (
    <LiquidMetalButton
      size="sm"
      borderWidth={6}
      icon={<ArrowRight className="w-4 h-4" />}
      metalConfig={{
        colorBack: "#acc8f5",
        colorTint: "#e9cf5b",
      }}
      onClick={handleLogout}
    >
      Log Out
    </LiquidMetalButton>
  ) : (
    <LiquidMetalButton
      size="sm"
      borderWidth={6}
      icon={<ArrowRight className="w-4 h-4" />}
      metalConfig={{
        colorBack: "#acc8f5",
        colorTint: "#e9cf5b",
      }}
      onClick={() => navigate("/login")}
    >
      Login
    </LiquidMetalButton>
  )}

</div>
    </>
  );
}
