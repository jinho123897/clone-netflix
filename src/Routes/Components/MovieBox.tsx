import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { makeImagePath } from "../../utilis.ts";
import { useHistory, useLocation } from "react-router-dom";

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
    transform-origin: top left;
  }
  &:last-child {
    transform-origin: bottom right;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  top: 100%;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  h4 {
    font-size: 18px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
    transition: {
      type: "tween",
    },
  },
  hover: {
    scale: 1.3,
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
        key={movieInfo.id}
        layoutId={movieInfo.id + ""}
        onClick={() =>
          type === "home"
            ? homeBoxClick(movieInfo.id)
            : searchBoxClick(movieInfo.id)
        }
      >
        <Info variants={infoVariants}>
          <h4>{movieInfo.name || movieInfo.title}</h4>
        </Info>
      </Box>
    </>
  );
}

export default MovieBox;
