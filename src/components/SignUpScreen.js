import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebaseConfig";
import "./SignUpScreen.css";
function SignUpScreen({ email }) {
  const [signin, setSignin] = useState(true);
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  useEffect(() => {
    if (email) {
      emailRef.current.value = email;
    }
  }, []);
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        emailRef.current.value = "";
        passwordRef.current.value = "";
      })
      .catch((err) => alert(err));
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((user) => {
        emailRef.current.value = "";
        passwordRef.current.value = "";
      })
      .catch((err) => alert(err));
  };
  const showPassword = (e) => {
    e.preventDefault();
    setShow(!show);
    passwordRef.current.type === "password"
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");
  };
  return (
    <div className="signupscreen">
      <form>
        <h1>Sign {signin ? "In" : "Up"}</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <div className="signupscreen__password">
          <input
            className="password"
            ref={passwordRef}
            placeholder="Password"
            type="password"
          />
          <button onClick={showPassword}>{show ? "Hide" : "Show"}</button>
        </div>
        {signin ? (
          <button onClick={signIn} type="submit">
            Sign In
          </button>
        ) : (
          <button onClick={register} type="submit">
            Sign Up
          </button>
        )}
        <h4>
          {signin ? (
            <>
              <span className="signupscreen__gray">New to Netflix? </span>
              <span
                onClick={() => setSignin(false)}
                className="signupscreen__link"
              >
                Sign Up now
              </span>
            </>
          ) : (
            <>
              <span className="signupscreen__gray">Alredy Registered? </span>
              <span
                onClick={() => setSignin(true)}
                className="signupscreen__link"
              >
                Sign In
              </span>
            </>
          )}
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
