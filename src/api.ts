const DISNEY_API_URL = "https://disney_api.nomadcoders.workers.dev/characters";
const MOVIE_DB_API_URL = "https://api.themoviedb.org/3";
const MOVIE_DB_API_KEY = "15d2ea6d0dc1d476efbca3eba2b9bbfb";
const MOVIE_DB_IMAGE_BASE_URL = "http://image.tmdb.org/t/p/w500/";

export const fetchAllCharacters = async (): Promise<any> => {
  const response = await fetch(DISNEY_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  return response.json();
};

export const fetchCharacterDetail = async (id: string): Promise<any> => {
  const response = await fetch(`${DISNEY_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch character with ID: ${id}`);
  }
  return response.json();
};

export const searchMovieByTitle = async (filmTitle: string): Promise<any> => {
  if (!filmTitle) {
    throw new Error("No film title provided");
  }

  const fixed = filmTitle.replace(/\s*\(.*?\)\s*/g, "").trim();

  const response = await fetch(
    `${MOVIE_DB_API_URL}/search/movie?api_key=${MOVIE_DB_API_KEY}&query=${fixed}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search movie");
  }

  const json = await response.json();

  if (json && json.results && json.results.length > 0) {
    return {
      title: json.results[0].title,
      poster: `${MOVIE_DB_IMAGE_BASE_URL}${json.results[0].poster_path}`,
    };
  } else {
    return null;
  }
};
