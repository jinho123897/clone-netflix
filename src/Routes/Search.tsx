import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { searchAllContents } from "../api.ts";
import Card from "./Components/Card.tsx";
import styled from "styled-components";
import Modal from "./Components/Modal.tsx";
import Loader from "./Components/Loader.tsx";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 50px;
  min-height: 60vh;
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
  const clickedContentId = search.split("&mid=")[1];
  const { data, isLoading } = useQuery(["searchAllContents", keyword], () =>
    searchAllContents(keyword)
  );

  return (
    <Wrapper>
      <Title>
        Search Results for <span>{keyword}</span>
      </Title>

      {isLoading ? (
        <Loader />
      ) : (
        <MovieWrapper>
          {data?.results.map((content) => (
            <Card
              movieInfo={content}
              key={content.id}
              page="search"
              apiKeyword="search"
            />
          ))}
        </MovieWrapper>
      )}

      {clickedContentId ? (
        <Modal page="search" moviesInfo={data?.results} />
      ) : null}
    </Wrapper>
  );
}

export default Search;
