import React, { Component } from "react";
import "./styles.scss";
import { Buttons } from "../Forms/Buttons";
import Tulips from "../../assets/tulips.jpg";
import { FormInput } from "../Forms/FormInput";
import { auth, handleUserProfile } from "../../firebase/utils.js";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

export default class SignUpComponent extends Component {
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

  handleFormSubmit = async (e) => {
    e.preventDefault(0);
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = [`Passwords don\'t match`];
      this.setState({
        errors: err,
      });
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await handleUserProfile(user, { displayName });
      this.setState({
        ...initialState, // restore the initial state
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;
    return (
      <div className="signUp" style={{ backgroundImage: `url(${Tulips})` }}>
        <div className="wrap">
          <h2>sign up</h2>
          {errors.length > 0 && (
            <ul>
              {errors.map((err, i) => (<li key={i}>{err}</li>))}
            </ul>
          )}
          <div className="formWrap">
            <form onSubmit={this.handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeHolder="Enter Full Name"
                onChange={this.handleChange}
              />
              <FormInput
                validate
                type="email"
                name="email"
                value={email}
                placeHolder="Enter email"
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                placeHolder="Enter password"
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeHolder="Enter password again"
                onChange={this.handleChange}
              />
              <Buttons type="submit">Register</Buttons>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
