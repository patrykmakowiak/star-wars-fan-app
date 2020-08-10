export const getInitFilm = (id = -1) => ({
  characters: [],
  created: "",
  director: "",
  edited: "",
  episode_id: id,
  opening_crawl: "",
  planets: [],
  producer: "",
  release_date: "",
  species: [],
  starships: [],
  title: "",
  url: "",
  vehicles: []
});

export const mapFilms = films =>
  films.map((film, index) => ({
    ...film,
    id: index + 1
  }));

export const mapFilm = (id, film) => ({
  ...film,
  id
});
