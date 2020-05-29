import React, { Component } from "react";
import "./styles.scss";
import { Buttons } from "../Forms/Buttons";
import { auth, signInWithGoogle } from "../../firebase/utils.js";
import Pietro1 from "../../assets/pietro1.jpg";
import { FormInput } from "../Forms/FormInput";

import { FaGooglePlus } from "react-icons/fa";

const initialState = {
  email: "",
  password: "",
};

export default class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // console.log(value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="signIn" style={{ backgroundImage: `url(${Pietro1})` }}>
        <div className="wrap">
          <h2>log in</h2>

          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
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
              <Buttons type="submit">Log in</Buttons>
              <div className="socialSignIn">
                <div className="row">
                  <FaGooglePlus className="icon" onClick={signInWithGoogle} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
