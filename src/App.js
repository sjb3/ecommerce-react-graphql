import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import "./default.scss";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";

// layouts
import { MainLayout } from "./layouts/MainLayout";
import { HomePageLayout } from "./layouts/HomePageLayout";

// pages
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Recovery } from "./pages/Recovery";
import Registration from "./pages/Registration";

const App = (props) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const { currentUser, setCurrentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      // using util function
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomePageLayout>
              <HomePage />
            </HomePageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// class App extends Component {
//   authListener = null;

//   componentDidMount() {
//     const { setCurrentUser } = this.props;

//     this.authListener = auth.onAuthStateChanged(async (userAuth) => {
//       // using util function
//       if (userAuth) {
//         const userRef = await handleUserProfile(userAuth);
//         userRef.onSnapshot((snapshot) => {
//           setCurrentUser({
//             id: snapshot.id,
//             ...snapshot.data(),
//           });
//         });
//       }

//       setCurrentUser(userAuth);
//     });
//   }

//   componentWillUnmount() {
//     this.authListener();
//   }

//   render() {
//     const { currentUser } = this.props;

//     return (

//     );
//   }
// }

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(App);
