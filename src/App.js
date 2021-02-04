import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { auth } from "./firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
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
  }, []);
  return (
    <Router>
      <Switch>
        {!user ? (
          <LoginScreen />
        ) : (
          <Route exact path="/">
            <div className="app">
              <HomeScreen />
            </div>
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
