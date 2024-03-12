import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { makeImagePath } from "../../utilis.ts";

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

function MovieInfo({ moviesInfo }) {
  const history = useHistory();
  const { search } = useLocation();
  const clickedMovieId = search.split("&mid=")[1];
  const clickedMovieInfo = moviesInfo?.results.find(
    (movie) => movie.id === Number(clickedMovieId)
  );
  const onOverlayClick = () => history.push(search.split("&")[0]);

  return (
    <Overlay
      onClick={onOverlayClick}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BigMovie layoutId={moviesInfo.movieId}>
        {clickedMovieInfo && (
          <>
            <BigCover bgphoto={makeImagePath(clickedMovieInfo.backdrop_path)} />
            <BigInfo>
              <BigTitle>
                {clickedMovieInfo.name || clickedMovieInfo.title}
              </BigTitle>
              <BigOverview>{clickedMovieInfo.overview}</BigOverview>
            </BigInfo>
          </>
        )}
      </BigMovie>
    </Overlay>
  );
}

export default MovieInfo;
