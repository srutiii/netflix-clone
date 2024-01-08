import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import endpoints, { Imageurl } from "../services/movieServices";

function Hero() {
  const [movie, setMovie] = useState({});
  // fetching random movies from the array of movies we got asimport {auth, db} from '../services/  firebase'
 
  useEffect(() => {
    axios.get(endpoints.popular).then((Response) => {
      const movies = Response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      // setting randommovies to movies so that we can use it to display the hero banner and each time we get a random movie banner.
      setMovie(randomMovie);
    });
  }, []);
  // for some reasons if the loading takes time we can display this alternative.
  if (!movie)
    return (
      <>
        <p>Fetching Movie...</p>
      </>
    );

  //Slicing the overview if its too long.
  const truncate = (str, length) => {
    if (!str) return "";

    return str.length > length ? str.slice(0, length) + " ..." : str;
  };

  // movie object destructuring.
  const { title, backdrop_path, release_date, overview } = movie;
  console.log(movie);

  return (
    <div className="w-full  h-[450px] md:h-[550px] ">
      <div className="w-full h-full">
        <div className="absolute w-full h-[450px] md:h-[550px] bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover object-top"
          src={Imageurl(backdrop_path, "original")}
          //   src={`https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg`}
          alt={title}
        />

        <div className="absolute w-full top-[20%] lg:top-[35%] p-4 md:p-8">
          <h1 className="text-3xl md:text-6xl">{title}</h1>
          <div className="mt-8 mb-4">
            <button className="capitalize border bg-gray-300 text-black px-5 py-2 mr-2">
              play
            </button>
            <button className="capitalize border border-gray-400 px-5 py-2 ">
              watch later
            </button>
          </div>
          <p className="text-sm text-gray-500">{release_date}</p>
          <p className="text-bash-[400px]e text-gray-200 w-full max-w-[70%] md:max-w-[50%] lg:max-w-[35%]">
            {truncate(overview, 160)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
