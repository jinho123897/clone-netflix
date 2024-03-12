const API_KEY = "eb615a14961e87c02cb89c3fae3e6dbc";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function searchMovies(keyword) {
  return fetch(
    `${BASE_PATH}/search/movie?query=${keyword}&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function searchAllContents(keyword?: string) {
  return fetch(
    `${BASE_PATH}/search/multi?query=${keyword}&language=en-US&api_key=${API_KEY}`
  ).then((response) => response.json());
}

// https://api.themoviedb.org/3/search/movie?query=dune&api_key=eb615a14961e87c02cb89c3fae3e6dbc&language=en-US&page=1
