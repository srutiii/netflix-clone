import { Imageurl } from "../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import {db} from '../services/firebase'
import { useState } from "react";

const Movie_item = ({ movie }) => {
  const [like, setLike] = useState(false);
  const { title, backdrop_path } = movie;
  const {user} = UserAuth()

  const markFavShow = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      alert("Login to save a movie.");
    }
  };

  return (
    <div className="relative w-[160px] sm:w[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
      <img src={Imageurl(backdrop_path, "w500")} alt={title} />

      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100 ">
        <p className="whitespace-normal text-xs md:text-sm font-nsans-bold flex justify-center items-center h-full">
          {movie.title}
        </p>
        <div>
          <p className="cursor-pointer" onClick={markFavShow}>
            {like ? (
              <FaHeart
                size={20}
                className="absolute top-2 left-2 text-gray-300"
              />
            ) : (
              <FaRegHeart
                size={20}
                className="absolute top-2 left-2 text-gray-300"
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie_item;
