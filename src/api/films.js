import { instance } from "@/plugins/axios";

export const getFilms = () =>
  instance({
    url: "/films/"
  });

export const getFilm = id =>
  instance({
    url: `films/${id}/`
  });

export const searchFilm = name =>
  instance({
    url: `films/?search=${name}`
  });
