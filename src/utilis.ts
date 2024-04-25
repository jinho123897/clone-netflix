export function makeImagePath(id: string, format?: string) {
  if (id) {
    return `https://image.tmdb.org/t/p/${
      format ? format : "original"
    }/${id}.jpg`;
  } else {
    return process.env.PUBLIC_URL + "/noImage.png";
  }
}
