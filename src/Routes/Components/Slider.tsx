import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import useWindowDimensions from "../../useWindowDimensions.tsx";
import { useQuery } from "react-query";
import { IGetMoviesResult, getPopularMovies } from "../../api.ts";
import MovieBox from "./MovieBox.tsx";

const Wrapper = styled.div`
  position: relative;
  top: -10vh;
  padding: 0 40px;
`;

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;

const Slider = styled.div`
  position: relative;
  height: 10vw;

  & > button {
    display: block;
    width: 40px;
    height: 100%;
    border: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 30px;
    text-align: center;
    opacity: 0;
    transition: 0.3s all;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

const PrevBtn = styled.button`
  left: -40px;
`;

const NextBtn = styled.button`
  right: -40px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
`;

const sliderVariants = {
  enter: ({ isBack, windowWidth }) => ({
    x: isBack ? -windowWidth : windowWidth,
  }),
  center: { x: 0 },
  exit: ({ isBack, windowWidth }) => ({
    x: isBack ? windowWidth : -windowWidth,
  }),
};

function SliderWrap() {
  const windowWidth = useWindowDimensions();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getPopularMovies
  );
  const offset = 5;
  const [sliderIdx, setSliderIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIdx((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIdx((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      <Title>Popular movies</Title>
      <Slider>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={{ isBack, windowWidth }}
        >
          <Row
            custom={{ isBack, windowWidth }}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            key={sliderIdx}
          >
            {data?.results
              .slice(1)
              .slice(offset * sliderIdx, offset * sliderIdx + offset)
              .map((movie) => (
                <MovieBox movieInfo={movie} type="home" key={movie.id} />
              ))}
          </Row>
        </AnimatePresence>
        <PrevBtn onClick={decreaseIndex}>&lt;</PrevBtn>
        <NextBtn onClick={increaseIndex}>&gt;</NextBtn>
      </Slider>
    </Wrapper>
  );
}

export default SliderWrap;
