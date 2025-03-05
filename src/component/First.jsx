import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthForm.css";  

const AuthForm = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // Sign Up states
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Sign In states
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      });
      toast.success(res.data.msg || "Registered successfully!");
      setIsRightPanelActive(true); // Switch to the sign-in panel
    } catch (error) {
      toast.error(error.response?.data.msg || "Registration failed");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: signInEmail,
        password: signInPassword,
      });
      toast.success("Login successful!", { closeButton: true });
      localStorage.setItem("token", res.data.token);
      navigate("/second");
    } catch (error) {
      toast(error.response?.data.msg || "Invalid credentials", {
        type: "default", // Use a string instead of toast.TYPE.DEFAULT
        closeButton: false, // Remove the close (x) button
        style: {
          backgroundColor: "#fff", // Neutral background
          color: "#000",           // Neutral text color
          border: "1px solid #ccc" // Optional border for a subtle outline
        }
      });
    }
  };


  return (
    <div className="auth-page">
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={signUpName}
              onChange={(e) => setSignUpName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;