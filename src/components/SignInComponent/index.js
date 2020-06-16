import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { Buttons } from "../Forms/Buttons";
import { auth, signInWithGoogle } from "../../firebase/utils.js";

// import Tulips from "../../assets/tulips.jpg";
import { FormInput } from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
import { FaGooglePlus } from "react-icons/fa";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const configAuthWrapper = {
    headline: "log in",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Enter password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <div className="links">
            <Link to="/recovery">Reset Password ?</Link>
          </div>
          <Buttons type="submit">Log in</Buttons>
          <div className="socialSignIn">
            <div className="row">
              <FaGooglePlus className="icon" onClick={signInWithGoogle} />
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignInComponent;
