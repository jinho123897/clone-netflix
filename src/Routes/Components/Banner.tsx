import React from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { makeImagePath } from "../../utilis.ts";
import { IGetMoviesResult, getContents } from "../../api.ts";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import Modal from "./Modal.tsx";

const BannerWrap = styled.div<{ bgphoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const PlayBtn = styled.button``;
const InfoBtn = styled.button`
  background-color: gray;
  color: white;
  margin-left: 10px;
`;

const BtnWrap = styled.div`
  display: flex;
  margin-top: 30px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 10px 15px;
    border-radius: 3px;
    border: 0;
    transition: 0.2s all;
  }

  button:hover {
    opacity: 0.7;
  }
`;

const Title = styled.h2`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.4rem;
  width: 40%;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

function Banner({ category, apiKeyword }) {
  const bigMovieMatch = useRouteMatch<{ find: string; contentId: string }>(
    `/${category}/:find/:contentId`
  );
  const history = useHistory();
  const { data } = useQuery<IGetMoviesResult>(
    [category + "banner", apiKeyword],
    () => getContents(category, apiKeyword)
  );

  const overlayInfo = (movieId) => {
    history.push(`/${category}/banner/${movieId}`);
  };

  return (
    <BannerWrap bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
      <Title>{data?.results[0].title ?? data?.results[0].name}</Title>
      <Overview>{data?.results[0].overview}</Overview>
      <BtnWrap>
        <PlayBtn>
          <FaPlay />
          Play
        </PlayBtn>
        <InfoBtn onClick={() => overlayInfo(data?.results[0].id)}>
          <CiCircleInfo />
          Infomation
        </InfoBtn>
      </BtnWrap>

      {bigMovieMatch?.params.find === "banner" ? (
        <Modal moviesInfo={data?.results} page={category} />
      ) : null}
    </BannerWrap>
  );
}

export default Banner;
