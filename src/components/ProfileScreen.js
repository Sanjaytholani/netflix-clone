import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateEmail } from "../features/userSlice";
import { auth } from "../firebaseConfig";
import Nav from "./Nav";
import "./ProfileScreen.css";
function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [sub, setSub] = useState("");
  const [email, setEmail] = useState(user.email);
  const handelSubmit = (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    currentUser
      .updateEmail(email)
      .then(() => {
        dispatch(updateEmail(email));
      })
      .catch((err) => alert(err));
  };
  const plan = ({ planHeader, planRes, subscribe = false }) => (
    <div className="profilescreen__plan">
      <div className="profilescreen__plandetails">
        <div className="profilescreen__planheader">
          <h4>{planHeader}</h4>
        </div>
        <div className="profilescreen__planRes">
          <p>{planRes}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setSub(planHeader);
        }}
        className={`profilescreen__button ${
          subscribe ? `profilescreen__current` : `profilescreen__subscribe`
        }`}
      >
        {subscribe ? "Current Package" : "Subscribe"}
      </button>
    </div>
  );
  return (
    <div className="profilescreen">
      <Nav />
      <div className="profilescreen__body">
        <h1>Edit Profile</h1>
        <div className="profilescreen__info">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
            alt="avatar"
          />
          <div className="profilescreen__details">
            <form>
              <input
                className=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={(e) => handelSubmit(e)}
                type="submit"
                style={{ display: "none" }}
              >
                Submit
              </button>
            </form>
            <div className="profilescreen__plans">
              <h3>Plans</h3>
              {plan({
                planHeader: "Netflix Standard",
                planRes: "1080P",
                subscribe: "Netflix Standard" === sub,
              })}
              {plan({
                planHeader: "Netflix Basic",
                planRes: "480P",
                subscribe: "Netflix Basic" === sub,
              })}
              {plan({
                planHeader: "Netflix Premium",
                planRes: "4k",
                subscribe: "Netflix Premium" === sub,
              })}
              <button
                onClick={() => auth.signOut()}
                className="profilescreen__signout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
