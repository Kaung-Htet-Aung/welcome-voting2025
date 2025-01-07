import React, { useState } from "react";
import {account } from "../appwrite";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Log in the user
     const user= await account.createEmailPasswordSession(email,password)
     localStorage.setItem("session", user.$id);
      window.location.replace("/");
      alert("Login successful!");

      // Redirect or perform further actions
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
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
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
      <div className="toggle-box">
        <div className="toggle-panel">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button onClick={toggleForm} className="btn">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
