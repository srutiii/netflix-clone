// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Signup() {
  const [rememberLogin, setRemeberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full h-screen">
      <img
        className="hidden md:block absolute w-full h-full object-cover"
        src={`https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg`}
        alt=""
      />
      <div className="bg-black/70 h-screen w-full fixed top-0" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[500px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-14 capitalize">
            <h1 className="text-3xl font-nsans-bold ">sign up</h1>
            <form
              onSubmit={handleFormSubmit}
              className="w-full flex flex-col py-4"
            >
              <input
                className="bg-gray-700 p-3 my-4 rounded"
                type="email"
                placeholder="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-gray-700 p-3 my-4 rounded"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="capitalize p-4 rounded mt-4 font-nsans-bold my-6 bg-red-700 hover:bg-red-600">
                sign up
              </button>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={rememberLogin}
                    onChange={(e) => setRemeberLogin(!rememberLogin)}
                  />
                  Remember Me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="mt-6 text-base">
                <span className="text-gray-600 mr-2">
                  Already subscribed to Netflix?
                </span>
                <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
