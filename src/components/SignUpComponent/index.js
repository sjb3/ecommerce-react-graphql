import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Buttons } from "../Forms/Buttons";
// import Pietro1 from "../../assets/pietro1.jpg";
import { FormInput } from "../Forms/FormInput";
import { auth, handleUserProfile } from "../../firebase/utils.js";
import { AuthWrapper } from "./../AuthWrapper";

const SignUpComponent = () => {
  const [displayName, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // Clean up the input boxes
  const resetForm = () => {
    setDisplayname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const configAuthWrapper = {
    headline: "register",
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(0);

    if (password !== confirmPassword) {
      const err = [`Passwords don\'t match`];
      setErrors(err);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, {
        displayName,
      });
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Enter Full Name"
            handleChange={(e) => setDisplayname(e.target.value)}
          />
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
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter password again"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Buttons type="submit">Register</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUpComponent;
