import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "./styles.scss";
import { signUpUser, resetAllAuthForms } from "../../redux/User/user.actions";
import { Buttons } from "../Forms/Buttons";
import { FormInput } from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});

const SignUpComponent = (props) => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ displayName, email, password, confirmPassword }));
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

export default withRouter(SignUpComponent);
