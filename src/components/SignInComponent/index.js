import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { Buttons } from "../Forms/Buttons";
import { auth, signInWithGoogle } from "../../firebase/utils.js";

// import Tulips from "../../assets/tulips.jpg";
import { FormInput } from "../Forms/FormInput";
import { AuthWrapper } from "./../AuthWrapper";
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

    const configAuthWrapper = {
      headline: "log in",
      // backgroundImage: `${Tulips}`,
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={this.handleChange}
            />
            <div className="links">
              <Link to="/recovery">Reset Password ?</Link>
            </div>
            <Buttons type="submit">Log in</Buttons>
            <div className="socialSignIn">
              <div className="row">
                <FaGooglePlus className="icon" onClick={signInWithGoogle} />
              </div>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}
