import React, { Component } from "react";
import "./styles.scss";
import { Buttons } from "../Forms/Buttons";
import { signInWithGoogle } from "../../firebase/utils.js";
import Pietro1 from "../../assets/pietro1.jpg";

export default class SignInComponent extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="signIn" style={{ backgroundImage: `url(${Pietro1})` }}>
        <div className="wrap">
          <h2>log in</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <div className="socialSignIn">
                <div className="row">
                  <Buttons onClick={signInWithGoogle}>
                    Log in with Google
                  </Buttons>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
