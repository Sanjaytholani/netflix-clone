import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateEmail } from "../features/userSlice";
import { auth } from "../firebaseConfig";
import Nav from "./Nav";
import PlanScreen from "./PlanScreen";
import "./ProfileScreen.css";
function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await setLoading(false);
    }, 1000);
  }, []);
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
              <h3>
                Plans
                {loading ? (
                  ""
                ) : user.plan ? (
                  <p>(Current plan: {user.plan})</p>
                ) : (
                  <p style={{ color: "#e50914" }}>
                    Get a Subscription To continue
                  </p>
                )}
              </h3>
              <PlanScreen />
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
