import React from "react";
import styled from "styled-components";
import Banner from "./Components/Banner.tsx";
import Sliders from "./Components/Slider.tsx";

const Wrapper = styled.div``;

function Tv() {
  const category = "tv";
  return (
    <Wrapper>
      <Banner category={category} apiKeyword="top_rated" />
      <Sliders
        category={category}
        title="Airing Today"
        apiKeyword="airing_today"
      />
      <Sliders category={category} title="Top Rated" apiKeyword="top_rated" />
      <Sliders category={category} title="On The Air" apiKeyword="on_the_air" />
      <Sliders category={category} title="Popular" apiKeyword="popular" />
    </Wrapper>
  );
}

export default Tv;
