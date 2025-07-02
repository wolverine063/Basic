import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // ✅ this is the hook to programmatically navigate

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#f5f5f5",
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "1.5rem",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ textDecoration: "none", color: "#333" }}>
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "#333" }}
          >
            Contact
          </Link>
        </li>
      </ul>

      <div>
        <button
          onClick={() => navigate("/login")} // ✅ fixed
          style={{ marginRight: "0.5rem", padding: "0.5rem 1rem" }}
        >
          Login
        </button>
        <button onClick={() => navigate("/signup")} style={{ padding: "0.5rem 1rem" }}>Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
