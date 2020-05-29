import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./default.scss";
import { auth, handleUserProfile } from "./firebase/utils";

// layouts
import { MainLayout } from "./layouts/MainLayout";
import { HomePageLayout } from "./layouts/HomePageLayout";

// pages
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import Registration from "./pages/Registration";

const initialState = {
  currentUser: null,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      // this part will be replaced with new util
      // if (!userAuth) {
      //   this.setState({
      //     ...initialState,
      //   });
      // }
      // this.setState({
      //   currentUser: userAuth,
      // });

      // using util function
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({
        ...initialState,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePageLayout currentUser={currentUser}>
                <HomePage />
              </HomePageLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
