import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie_item from "./Movie_item";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

function Movie_row({ title, url }) {
  const rowId = Math.floor(Math.random() * 1000);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(url).then((Response) => setMovies(Response.data.results));
  }, [url]);

  // console.log(movies);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  return (
    <>
      <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          size={40}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
        />
        <div
          id={`slider${rowId}`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <Movie_item key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          size={40}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
        />
      </div>
    </>
  );
}

export default Movie_row;
