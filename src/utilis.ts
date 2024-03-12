export function makeImagePath(id: string, format?: string) {
  if (id) {
    return `https://image.tmdb.org/t/p/${
      format ? format : "original"
    }/${id}.jpg`;
  } else {
    return "/no_image.png";
  }
}
