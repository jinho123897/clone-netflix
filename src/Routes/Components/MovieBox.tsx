import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaPlay, FaPlus, FaRegThumbsUp } from "react-icons/fa";

import { makeImagePath } from "../../utilis.ts";

const Box = styled(motion.div)<{ bgphoto: string }>`
  width: 100%;
  background-color: white;
  height: 10vw;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 3px;

  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &:first-child {
    transform-origin: center left;
    background-color: white;
  }
  &:nth-child(5n + 1) {
    transform-origin: center left;
  }
  &:nth-child(5n) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: relative;
  top: 100%;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  h4 {
    font-size: 18px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  margin-bottom: 10px;

  & > button {
    position: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 13px;
    margin-right: 10px;
    border: 1px solid gray;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    transition: 0.3s all;
    font-size: 10px;
    cursor: pointer;
  }

  & > button:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  & > button:first-child {
    background-color: white;
    color: #333;
    border-color: white;
  }
`;

const PlayBtn = styled.button``;
const PlusBtn = styled.button``;
const GoodBtn = styled.button``;

const Title = styled.h4``;

const boxVariants = {
  normal: {
    scale: 1,
    transition: {
      type: "tween",
    },
  },
  hover: {
    scale: 1.2,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

function MovieBox({ movieInfo, type }) {
  const history = useHistory();
  const { search } = useLocation();
  const searchBoxClick = (movieId: number) => {
    history.replace(`${search.split("&")[0]}&mid=${movieId}`);
  };

  const homeBoxClick = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <>
      <Box
        variants={boxVariants}
        whileHover="hover"
        initial="normal"
        bgphoto={makeImagePath(movieInfo.backdrop_path)}
        layoutId={movieInfo.id + ""}
        onClick={() =>
          type === "home"
            ? homeBoxClick(movieInfo.id)
            : searchBoxClick(movieInfo.id)
        }
      >
        <Info variants={infoVariants}>
          <BtnWrap>
            <PlayBtn>
              <FaPlay />
            </PlayBtn>
            <PlusBtn>
              <FaPlus />
            </PlusBtn>
            <GoodBtn>
              <FaRegThumbsUp />
            </GoodBtn>
          </BtnWrap>
          <Title>{movieInfo.name || movieInfo.title}</Title>
        </Info>
      </Box>
    </>
  );
}

export default MovieBox;
