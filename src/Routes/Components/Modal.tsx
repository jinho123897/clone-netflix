import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaPlay, FaPlus, FaRegThumbsUp } from "react-icons/fa";
import { makeImagePath } from "../../utilis.ts";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled(motion.div)`
  position: relative;
  width: 50vw;
  height: 90vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const Cover = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 40%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const Info = styled.div`
  position: relative;
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

const Title = styled.h3`
  position: absolute;
  top: -100px;
  font-size: 28px;
`;

const Overview = styled.p`
  margin-top: 20px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid gray;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 20px;
  color: white;
  transition: 0.3s all;
  &:hover {
    transform: scale(1.05);
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
const BtnWrap = styled.div`
  position: absolute;
  top: -50px;
  display: flex;

  & > button {
    position: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 10px;
    border: 1px solid gray;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    transition: 0.3s all;
    font-size: 14px;
    cursor: pointer;
  }

  & > button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  & > button:first-child {
    width: 80px;
    background-color: white;
    color: #333;
    border-radius: 3px;
    border-color: white;
  }
`;

const PlayBtn = styled.button``;
const PlusBtn = styled.button``;
const GoodBtn = styled.button``;

interface IParams {
  find: string;
  movieId: string;
}

function Modal({ moviesInfo, page }) {
  const history = useHistory();
  const { search } = useLocation();
  const clickedMovieId = search.split("&mid=")[1];
  const clickedHomeContentType = useRouteMatch<IParams>(
    `/${page}/:find/:movieId`
  );

  const clickedMovieInfo = moviesInfo.find((movie) =>
    page === "search"
      ? movie.id === Number(clickedMovieId)
      : movie.id === Number(clickedHomeContentType?.params.movieId)
  );

  const closeOverlay = () => {
    page === "search"
      ? history.replace(`/search${search.split("&mid=")[0]}`)
      : history.goBack();
  };
  return (
    <Overlay
      onClick={closeOverlay}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ContentBox
        layoutId={clickedMovieInfo?.movieId}
        onClick={(e) => e.stopPropagation()}
      >
        {clickedMovieInfo && (
          <>
            <Cover bgphoto={makeImagePath(clickedMovieInfo.backdrop_path)} />
            <Info>
              <Title>{clickedMovieInfo.name || clickedMovieInfo.title}</Title>
              <BtnWrap>
                <PlayBtn>
                  <FaPlay />
                  Play
                </PlayBtn>
                <PlusBtn>
                  <FaPlus />
                </PlusBtn>
                <GoodBtn>
                  <FaRegThumbsUp />
                </GoodBtn>
              </BtnWrap>
              {clickedMovieInfo.release_date ? (
                <p>Release date : {clickedMovieInfo.release_date}</p>
              ) : (
                <p>First Air Date : {clickedMovieInfo.first_air_date}</p>
              )}
              <p>
                Vote average :{" "}
                {"⭐️" +
                  Math.floor(clickedMovieInfo.vote_average * 100) / 100 ||
                  "None"}
              </p>
              <p>Vote count : {clickedMovieInfo.vote_count || "None"}</p>
              <Overview>{clickedMovieInfo.overview}</Overview>
            </Info>
          </>
        )}
        <CloseBtn onClick={closeOverlay}>
          <IoClose />
        </CloseBtn>
      </ContentBox>
    </Overlay>
  );
}

export default Modal;
