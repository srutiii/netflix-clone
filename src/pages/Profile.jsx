// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { onSnapshot, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../services/firebase";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Imageurl } from "../services/movieServices";
import {AiOutlineClose} from 'react-icons/ai'

function Profile() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
      if (doc.data()) setMovies(doc.data().favShows);
    });
  }, [user?.email]);

  console.log(movies);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };
 
  const handleUnlick = async(movie) =>{
    const userDoc = doc(db, "users", user.email)

    await updateDoc(userDoc,{
      favShows:arrayRemove(movie)
    })
  }
  
  return (
    <div>
      <div>
        <img
          className="md:block  w-full h-[400px] object-cover"
          src={`https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_medium.jpg`}
          alt=""
        />
        <div className="bg-black/70  w-full h-[400px] fixed top-0" />
        <div className="absolute top-[40%] p-5 ">
          <h1 className="text-4xl md:text-6xl font-nsans-bold">My Shows</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-2">{user.email}</p>
        </div>
      </div>

      <h1 className="font-nsans-bold relative px-5 mt-5 text-2xl">Fav shows</h1>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          size={40}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
        />
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-[160px] sm:w[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
              <img src={Imageurl(movie.backdrop_path, "w500")} alt={movies.title} />

              <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100 ">
                <p className="whitespace-normal text-xs md:text-sm font-nsans-bold flex justify-center items-center h-full">
                  {movie.title}
                </p>
                <div>
                  <p className="cursor-pointer" onClick={()=>handleUnlick(movie)} >
                  
                      <AiOutlineClose
                        size={25}
                        className="absolute top-2 right-2 text-gray-300"
                      />
                   
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          size={40}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Profile;
