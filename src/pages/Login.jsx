import React, { useState } from "react";
 // Import your styles
const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
        <div className="form-box login">
          <form>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
      <div className="toggle-box">
        <div className="toggle-panel">
          <h1> "Hello, Welcome!"</h1>
        
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
