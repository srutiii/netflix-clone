// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Navbar() {

  const {user, logOut} = UserAuth()
  const navigate = useNavigate()

  const handleLogOut = async()=>{
    try{
      await logOut()
      navigate("/")
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link to="/">
        <h1 className="uppercase text-red-600 text-3xl lg:text-5xl cursor-pointer font-nsans-bold">
          netflix
        </h1>
      </Link>

      {user?.email ? (
        // IF the user is logged in.
        <div>
          <Link to="/profile">
            <button className="capitalize pr-4">profile</button>
          </Link>

          
            <button onClick={handleLogOut} className="capitalize px-6 py-2 bg-red-600 cursor-pointer rounded ">
              log out
            </button>
          
        </div>
      ) : (
        // If the user is not logged in.
        <div>
          <Link to="/login">
            <button className="capitalize pr-4">login</button>
          </Link>

          <Link to="/signup">
            <button className="capitalize px-6 py-2 bg-red-600 cursor-pointer rounded ">
              sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
