import React from "react";
import logotrucho from "./logopedorro.png";

const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="nav-div">
        <img
          className="logo"
          src={logotrucho}
          alt="logo"
          width="30px"
          height="30px"
        />
        {!authToken && (
          <button
            className="nav-button"
            onClick={handleClick}
            disabled={showModal}>
            Log in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;

//Soy un comentario xd
