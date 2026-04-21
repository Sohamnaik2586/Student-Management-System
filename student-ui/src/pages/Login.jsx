import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", null, {
        params: { username, password }
      });

      localStorage.setItem("token", res.data.token);
      navigate("/students");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Invalid credentials. Try username: admin and password: password.");
      } else {
        setError("Cannot reach server. Please check backend is running and CORS settings.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <p className="auth-kicker">Student Management System</p>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to view and manage student records.</p>

        <form className="auth-form" onSubmit={login}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;