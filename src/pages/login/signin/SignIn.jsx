import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import FormContainer from "../FormContainer";
import "../Auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/SignUp");
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormContainer>
      <div className="form">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <div className="field email">
          <div className="icon"></div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="field password">
          <div className="icon"></div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button className="button" onClick={handleSignIn}>
          Sign In
        </button>
        <small onClick={goToSignUp}>회원가입</small>
      </div>
    </FormContainer>
  );
};

export default SignIn;
