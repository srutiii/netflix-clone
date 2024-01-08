// eslint-disable-next-line no-unused-vars
import React from "react";
import Hero from "../Components/Hero";
import Movie_row from "../Components/Movie_row";
import endpoints from "../services/movieServices";

function Home() {
  return (
    <div>
      <Hero />
      <Movie_row title="upcoming" url={endpoints.upcoming} />
      <Movie_row title="trending" url={endpoints.trending} />
      <Movie_row title="top rated" url={endpoints.topRated} />
      <Movie_row title="popular" url={endpoints.popular} />
    </div>
  );
}

export default Home;
