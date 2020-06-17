import React, { useState } from "react";
import { withRouter } from "react-router-dom"; // Give access to history
import "./styles.scss";
import { FormInput } from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
import { Buttons } from "../Forms/Buttons";
import { auth } from "../../firebase/utils.js";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const configAuthWrapper = {
    headline: "Email Password",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          // console.log("Password Reset Success");
          props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found.  Please try again."];
          this.setErrors(err);
        });
    } catch (err) {
      console.error(err);
    }
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
