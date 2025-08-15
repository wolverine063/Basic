import React from "react";

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save JWT token
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        
        // Redirect or update UI here
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong. Please try again.");
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
        position: "relative",
        padding: "1rem",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: "2rem",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Login to Nexus
        </h2>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #334155",
              backgroundColor: "#1e293b",
              color: "white",
              fontSize: "1rem",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #334155",
              backgroundColor: "#1e293b",
              color: "white",
              fontSize: "1rem",
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
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #7e22ce, #2563eb)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #9333ea, #3b82f6)")
            }
          >
            Sign In
          </button>
        </form>

        <div
          style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#94a3b8",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/Signup"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
