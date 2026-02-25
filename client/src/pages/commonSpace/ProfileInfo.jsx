import { useState, useRef, useEffect } from "react";
import "./ProfileInfo.css";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/apiFetch";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ---------- Country Data ---------- */

const countries = [
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "UK", dial: "+44" },
  { name: "France", code: "FR", dial: "+33" },
];

export default function ProfileInfoPage() {
  const { user, logout } = useAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    country_code: "+49",
    dob: "",
    nationality: "",
    house_number: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
  });

  /* ---------- Sync name & email from JWT ---------- */
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.full_name,
        email: user.email,
      }));
    }
  }, [user]);

  /* ---------- Fetch profile from backend ---------- */
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await apiFetch("/api/profile", {}, logout);
        if (!res) return; // important if 401 triggered logout

        const data = await res.json();

        if (data.success && data.profile) {
          const profile = data.profile;

          let house_number = "";
          let street = "";
          let city = "";
          let state = "";
          let postcode = "";

          if (profile.address) {
          const parts = profile.address.split(",");

          if (parts.length === 4) {
              const firstPart = parts[0].trim(); // "12 Main Street"

              const firstSplit = firstPart.split(" ");
              house_number = firstSplit[0];
              street = firstSplit.slice(1).join(" ");

              city = parts[1].trim();
              state = parts[2].trim();
              postcode = parts[3].trim();
            }
          }

          setFormData((prev) => ({
            ...prev,
            phone: profile.phone || "",
            country: profile.country || "",
            nationality: profile.nationality || "",
            dob: profile.dob ? profile.dob.split("T")[0] : "",
            house_number,
            street,
            city,
            state,
            postcode,
          }));
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  /* ---------- Handle Change ---------- */
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      phone,
      country,
      country_code,
      dob,
      nationality,
      house_number,
      street,
      city,
      state,
      postcode,
    } = formData;

    // Manual validation
    if (
      !phone ||
      !country ||
      !country_code ||
      !dob ||
      !nationality ||
      !house_number ||
      !street ||
      !city ||
      !state ||
      !postcode
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {

      const response = await apiFetch(
        "/api/profile",
        {
          method: "POST",
          body: JSON.stringify(formData),
        },
        logout
      );

      if (!response) return;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Profile saved successfully");

    } catch (error) {
      console.error(error);
      alert("Error saving profile");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <div className="avatar">
            {formData.full_name
              ? formData.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U"}
          </div>
          <div>
            <h2>{formData.full_name}</h2>
            <span className="role-badge">{user?.role}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* PERSONAL INFO */}
          <h3 className="section-title">Personal Information</h3>

          <div className="form-grid">

            <InputField
              label="Full Name"
              value={formData.full_name}
              disabled
              required={false}
            />

            <InputField
              label="Email"
              value={formData.email}
              disabled
              required={false}
            />

            {/* Phone + Country Code */}
            <div className="phone-group">
              <CustomDropdown
                label="Code"
                value={formData.country_code}
                options={countries.map((c) => ({
                  label: c.dial,
                  value: c.dial,
                }))}
                onChange={(val) => handleChange("country_code", val)}
                small
              />

              <InputField
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <InputField
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />

            <InputField
              label="Nationality"
              value={formData.nationality}
              onChange={(e) => handleChange("nationality", e.target.value)}
            />

            <CustomDropdown
              label="Country"
              value={formData.country}
              options={countries.map((c) => ({
                label: c.name,
                value: c.name,
              }))}
              onChange={(val) => handleChange("country", val)}
            />

          </div>

          {/* ADDRESS */}
          <h3 className="section-title">Address Information</h3>

          <div className="form-grid">

            <InputField
              label="House Number"
              value={formData.house_number}
              onChange={(e) => handleChange("house_number", e.target.value)}
            />

            <InputField
              label="Street"
              value={formData.street}
              onChange={(e) => handleChange("street", e.target.value)}
            />

            <InputField
              label="City"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />

            <InputField
              label="State"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />

            <InputField
              label="Postcode"
              value={formData.postcode}
              onChange={(e) => handleChange("postcode", e.target.value)}
            />

          </div>

          <button type="submit" className="save-btn">
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

/* ---------- Input Component ---------- */
function InputField({
  label,
  value,
  onChange,
  type = "text",
  disabled,
  required = true,
}) {
  return (
    <div className="input-group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        disabled={disabled}
        required={required}
      />
      <label>
        {label}
        {required && !disabled && <span className="required-star">*</span>}
      </label>
    </div>
  );
}
/* ---------- Custom Glass Dropdown ---------- */

function CustomDropdown({ label, value, options, onChange, small }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className={`dropdown ${small ? "small" : ""}`} ref={ref}>
      <div
        className={`dropdown-header ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {value || label}
        <span className={`arrow ${open ? "rotate" : ""}`}>⌄</span>
      </div>

      {open && (
        <div className="dropdown-list">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="dropdown-item"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}