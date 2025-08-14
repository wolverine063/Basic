import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://13.222.57.14:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setFormData({ name: "", email: "", password: "" }); // clear form
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: "2rem",
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.1)",
          maxWidth: "400px",
          width: "100%",
          color: "white",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Create Your Account
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #334155",
              backgroundColor: "#1e293b",
              color: "white",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #334155",
              backgroundColor: "#1e293b",
              color: "white",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #334155",
              backgroundColor: "#1e293b",
              color: "white",
            }}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(to right, #9333ea, #3b82f6)",
              color: "white",
              fontWeight: "bold",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#cbd5e1",
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
