import React, { useEffect, useState } from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { auth } from "./firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./components/ProfileScreen";
import Intro from "./components/Intro";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await setLoading(false);
    }, 5500);
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <Router>
      {loading ? (
        <Intro />
      ) : (
        <>
          {!user ? (
            <LoginScreen />
          ) : (
            <Switch>
              <Route exact path="/profile">
                <ProfileScreen />
              </Route>
              <Route exact path="/">
                {user.plan ? (
                  <div className="app">
                    <HomeScreen />
                  </div>
                ) : (
                  <Redirect to="/profile" />
                )}
              </Route>
            </Switch>
          )}
        </>
      )}
    </Router>
  );
}

export default App;
