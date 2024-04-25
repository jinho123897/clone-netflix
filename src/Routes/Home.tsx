import React from "react";
import styled from "styled-components";
import Sliders from "./Components/Slider.tsx";
import Banner from "./Components/Banner.tsx";

const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
`;

function Home() {
  const category = "movie";
  return (
    <Wrapper>
      <Banner category={category} apiKeyword="top_rated" />

      <Sliders
        category={category}
        title="Now Playing Movies"
        apiKeyword="now_playing"
      />

      <Sliders
        category={category}
        title="Top Rated Movies"
        apiKeyword="top_rated"
      />

      <Sliders
        category={category}
        title="Popular Movies"
        apiKeyword="popular"
      />

      <Sliders
        category={category}
        title="Upcoming Movies"
        apiKeyword="upcoming"
      />
    </Wrapper>
  );

  // return <Wrapper>{pageType?.params === "movie" ? "movie" : "tv"}</Wrapper>;
}

export default Home;
