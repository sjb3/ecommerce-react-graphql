import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./styles.scss";
import { signInUser, signInWithGoogle } from "../../redux/User/user.actions";
import { Buttons } from "../Forms/Buttons";

import { FormInput } from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
import { FaGooglePlus } from "react-icons/fa";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

const SignInComponent = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      props.history.push("/");
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
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
              <FaGooglePlus className="icon" onClick={handleGoogleSignIn} />
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignInComponent);
