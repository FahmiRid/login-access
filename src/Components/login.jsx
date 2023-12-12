import React from "react";
import '../styles/login.css';

export default function Login() {
  return (
    <div className="login-container">
      <form class="form">
        <ul className="wrapper">
          <li style={{ "--i": 4 }}>
            <input className="input" type="text" placeholder="Name" required />
          </li>
          <li style={{ "--i": 3 }}>
          <input
              className="input"
              type="password" 
              placeholder="Password" 
              required
              name="password"
            />
          </li>
          <li style={{ "--i": 1 }}>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
