import React, { useRef, useState } from "react";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";
function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const emailRef = useRef(null);
  return (
    <div className="loginscreen">
      <div className="loginscreen__background">
        <img
          className="loginscreen__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="logo"
        />
        <button onClick={() => setSignIn(true)} className="loginscreen__button">
          Sign in
        </button>
        <div className="loginscreen__gradient" />
      </div>
      <div className="loginscreen__body">
        {signIn ? (
          <SignUpScreen email={emailRef.current.value} />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time</h2>
            <h3>
              Ready to watch?Enter your email to create or restart your
              membership
            </h3>
            <div className="loginscreen__input">
              <form>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter your email"
                />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginscreen__getstarted"
                  type="submit"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
