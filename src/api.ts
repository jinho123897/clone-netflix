const API_KEY = "eb615a14961e87c02cb89c3fae3e6dbc";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IContent {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  name: string;
}

export interface IGetMoviesResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}

export function getContents(category: string, apiKeyword: string) {
  return fetch(
    `${BASE_PATH}/${category}/${apiKeyword}?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function searchAllContents(keyword?: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?query=${keyword}&language=en-US&api_key=${API_KEY}`
  ).then((response) => response.json());
}
