import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // Give access to history
import "./styles.scss";
import { FormInput } from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
import { Buttons } from "../Forms/Buttons";
import { auth } from "../../firebase/utils.js";

const initialState = {
  email: "",
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // console.log(value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;

    const config = {
      url: "http://localhost:3000/login",
    };

    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          // console.log("Password Reset Success");
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found.  Please try again."];
          this.setState({
            errors: err,
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { email, errors } = this.state;

    const configAuthWrapper = {
      headline: "Email Password",
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

          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={this.handleChange}
            />
            <Buttons type="submit">Email password</Buttons>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
