import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Route, Switch } from "react-router-dom";
import "./default.scss";
// import { auth, handleUserProfile } from "./firebase/utils";
import { checkUserSession } from "./redux/User/user.actions";

// hoc
import WithAuth from "./hoc/withAuth";

// layouts
import { MainLayout } from "./layouts/MainLayout";
import { HomePageLayout } from "./layouts/HomePageLayout";

// pages
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Recovery } from "./pages/Recovery";
import Registration from "./pages/Registration";
import { Dashboard } from "./pages/Dashboard";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
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
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
