import React from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { searchAllContents, searchMovies } from "../api.ts";
import MovieBox from "./Components/MovieBox.tsx";
import styled from "styled-components";
import MovieInfo from "./Components/MovieInfo.tsx";

const Wrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 50px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 50px;
  span {
    font-weight: 700;
  }
`;

const MovieWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

function Search() {
  const { search } = useLocation();
  const keyword = search.split("=")[1].split("&")[0];
  const { data, isLoading } = useQuery(["searchAllContents", "search"], () =>
    searchAllContents(keyword)
  );

  const clickedContentsId = search.split("&mid=")[1];
  // const clickedContentsInfo = data?.results.find(
  //   (content) => content.id === Number(clickedContentsId)
  // );

  return (
    <Wrapper>
      <Title>
        Search Results for <span>{keyword}</span>
      </Title>

      <MovieWrapper>
        {data?.results.map((content) => (
          <MovieBox movieInfo={content} key={content.id} type="search" />
        ))}
      </MovieWrapper>
      {clickedContentsId ? <MovieInfo moviesInfo={data} /> : null}
    </Wrapper>
  );
}

export default Search;
