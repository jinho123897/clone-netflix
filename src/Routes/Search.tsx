import React, { useEffect, useState } from "react";
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
  const keyword = new URLSearchParams(search).get("keyword");
  // const keyword = search.split("=")[1].split("&")[0];
  const clickedContentsId = search.split("&mid=")[1];
  const { data, isLoading } = useQuery(["searchAllContents", "search"], () =>
    searchAllContents(keyword)
  );

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
      {clickedContentsId ? <MovieInfo moviesInfo={data?.results} /> : null}
    </Wrapper>
  );
}

export default Search;
