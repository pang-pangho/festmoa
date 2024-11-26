import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import FormContainer from "../FormContainer";
import "../Auth.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      auth.currentUser.reload().then(() => {
        console.log("Updated user info:", auth.currentUser);
        alert(
          `회원가입이 완료되었습니다! 환영합니다, ${auth.currentUser.displayName}님!`
        );
        navigate("/signin");
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormContainer>
      <div className="form">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <div className="field">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
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
        <button className="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </FormContainer>
  );
};

export default SignUp;
