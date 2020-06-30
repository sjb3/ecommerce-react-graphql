import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordStart,
  resetUserState,
} from "../../redux/User/user.actions";
import { useHistory } from "react-router-dom"; // Give access to history
import "./styles.scss";
import FormInput from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
import Buttons from "../Forms/Buttons";
import { auth } from "../../firebase/utils.js";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const EmailPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const configAuthWrapper = {
    headline: "Email Password",
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
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

// export default withRouter(EmailPassword);
export default EmailPassword;
