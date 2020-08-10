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

export const mapSearchedFilms = (films, filmsId) =>
  films.map(film => ({
    ...film,
    id: filmsId[film.episode_id]
  }));

export const mapFilms = films =>
  films.map((film, index) => ({
    ...film,
    id: index + 1
  }));

export const mapFilm = (id, film) => ({
  ...film,
  id
});

export const getFilmsId = films =>
  films.reduce((accumulator, currentValue, currentIndex) => {
    accumulator[currentValue.episode_id] = currentIndex + 1;
    return accumulator;
  }, {});
