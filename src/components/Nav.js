import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";
function Nav() {
  const [show, handelShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handelShow(true);
      } else handelShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handelShow(true);
        } else handelShow(false);
      });
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        onClick={() => history.push("/")}
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Neflix logo"
      />
      <img
        onClick={() => history.push("/profile")}
        className="nav__avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
        alt="user-icon"
      />
    </div>
  );
}

export default Nav;
