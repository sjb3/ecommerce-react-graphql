import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { signUpUserStart } from "../../redux/User/user.actions";
import Buttons from "../Forms/Buttons";
import FormInput from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignUpComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      // dispatch(resetAllAuthForms());
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

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
    dispatch(
      signUpUserStart({ displayName, email, password, confirmPassword })
    );
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

// export default withRouter(SignUpComponent);
export default SignUpComponent;
