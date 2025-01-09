import React, { useState } from "react";
import { account } from "../appwrite";
import { Navigate } from "react-router-dom";
import '../login.css';
import { img, p } from "framer-motion/client";

const LoginRegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility

  const isLoggedIn = localStorage.getItem("session");;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Log in the user
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      localStorage.setItem("session", user.$id);
      return <Navigate to="/" />;

      // Redirect or perform further actions
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}  // Toggle between text and password
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
            <button
              type="button"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}  // Toggle password visibility
            >
              {showPassword ? (
                <img src="./images/eye.png" width={15} height={15} alt="eye" /> // Show eye-off icon
              ) : (
                <img src="./images/eye.png" width={15} height={15} alt="eye" /> // Show eye-off icon
              )}
            </button>
          </div>
          <button type="submit" className="btn">
            {loading ? 'Loading' : "Login"}
          </button>
        </form>
      </div>
      <div className="toggle-box">
        <div className="toggle-panel">
          <img src="./images/logo.webp" width="60" height="60" alt="" />
          <h1 style={{ marginTop: 10 }}>UCSMGY</h1>
          <p>2024-2025 fresher-welcome</p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
