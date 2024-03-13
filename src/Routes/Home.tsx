import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IGetMoviesResult, getPopularMovies } from "../api.ts";
import SliderWrap from "./Components/Slider.tsx";
import Banner from "./Components/Banner.tsx";
import MovieInfo from "./Components/MovieInfo.tsx";

const Wrapper = styled.div`
  background-color: black;
  min-height: 200vh;
  overflow: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getPopularMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner />
          <SliderWrap />
          <AnimatePresence>
            {bigMovieMatch ? (
              <MovieInfo moviesInfo={data?.results} type="home" />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
