import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { IGetMoviesResult, getPopularMovies } from "../api.ts";
import { makeImagePath } from "../utilis.ts";
import SliderWrap from "./Components/Slider.tsx";
import Banner from "./Components/Banner.tsx";

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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigMovie = styled(motion.div)`
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 40%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const BigInfo = styled.div`
  position: relative;
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

const BigTitle = styled.h3`
  position: absolute;
  top: -80px;
  font-size: 28px;
`;

const BigOverview = styled.p``;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getPopularMovies
  );

  const onOverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id === Number(bigMovieMatch?.params.movieId)
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
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BigMovie layoutId={bigMovieMatch.params.movieId}>
                    {clickedMovie && (
                      <>
                        <BigCover
                          bgphoto={makeImagePath(clickedMovie.backdrop_path)}
                        />
                        <BigInfo>
                          <BigTitle>{clickedMovie.title}</BigTitle>
                          <BigOverview>{clickedMovie.overview}</BigOverview>
                        </BigInfo>
                      </>
                    )}
                  </BigMovie>
                </Overlay>
                {/* <MovieInfo MoviesInfo={data} /> */}
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
