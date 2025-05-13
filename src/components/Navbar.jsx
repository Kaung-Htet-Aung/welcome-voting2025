import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img
          src="./images/logo.webp"
          alt=""
          width={50}
          height={50}
          style={{ lineHeight: 50 }}
        />
      </div>
      <ul id="menuList">
        <li>
          <Link to="/">Boys</Link>
        </li>
        <li>
          <Link to="/girl">Girls</Link>
        </li>
        <li>
          <Link to="https://vote-result.netlify.app/">Live Result</Link>
        </li>
        <li>
          <Link to="/votes">
            <img src="./images/ballot-box.png" alt="" width={30} height={30} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
