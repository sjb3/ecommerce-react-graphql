import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/User/user.actions";
import { withRouter } from "react-router-dom"; // Give access to history
import "./styles.scss";
import { FormInput } from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
import { Buttons } from "../Forms/Buttons";
import { auth } from "../../firebase/utils.js";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const EmailPassword = (props) => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const configAuthWrapper = {
    headline: "Email Password",
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      props.history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Buttons type="submit">Email password</Buttons>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
