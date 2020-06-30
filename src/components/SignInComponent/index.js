import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";
import Buttons from "../Forms/Buttons";

import FormInput from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
import { FaGooglePlus } from "react-icons/fa";

const mapState = ({ user }) => ({
  // signInSuccess: user.signInSuccess, // per update with redux, doesn't exist
  currentUser: user.currentUser,
});

const SignInComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      // dispatch(resetAllAuthForms());
      history.push("/");
    }
  }, [currentUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(signInUser({ email, password }));
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
    // dispatch(signInWithGoogle());
    // dispatch(googleSignInStart());
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

// export default withRouter(SignInComponent);
export default SignInComponent;
