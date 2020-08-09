import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

import {
  ADD_REVIEW,
  CACHE_FILMS,
  LOAD_FETCHED_FILM,
  LOAD_FETCHED_FILMS,
  LOAD_SEARCHED_FILMS,
  SORT_BY_DATE_ASC,
  SORT_BY_DATE_DESC,
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC,
  INIT_REVIEWS,
  INIT_REVIEW
} from "./mutations.type";
import { FETCH_FILM, FETCH_FILMS, SEARCH_FILMS } from "./actions.type";
import { getFilms, getFilm, searchFilm } from "@/api/films";
import { getInitFilm, mapFilms, mapFilm } from "@/utils";
import { ALL_FETCHED_FILMS } from "@/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    films: [],
    cachedFilms: {},
    film: getInitFilm(),
    reviews: {},
    isLoading: true,
    isSearching: false
  },
  mutations: {
    [CACHE_FILMS](state, { key, films }) {
      state.cachedFilms[key] = films;
    },
    [LOAD_FETCHED_FILMS](state, films) {
      state.films = films;
      state.isLoading = false;
    },
    [LOAD_FETCHED_FILM](state, { film }) {
      state.film = film;
      state.isLoading = false;
    },
    [LOAD_SEARCHED_FILMS](state, films) {
      state.films = films;
      state.isSearching = false;
    },
    [SORT_BY_TITLE_ASC](state) {
      state.films.sort((filmA, filmB) => (filmA.title > filmB.title ? 1 : -1));
    },
    [SORT_BY_TITLE_DESC](state) {
      state.films.sort((filmA, filmB) => (filmA.title < filmB.title ? 1 : -1));
    },
    [SORT_BY_DATE_ASC](state) {
      state.films.sort(
        (filmA, filmB) =>
          new Date(filmA.release_date) - new Date(filmB.release_date)
      );
    },
    [SORT_BY_DATE_DESC](state) {
      state.films.sort(
        (filmA, filmB) =>
          new Date(filmB.release_date) - new Date(filmA.release_date)
      );
    },
    [ADD_REVIEW](state, { id, name, email, rating, description }) {
      const newReview = {
        id: uuidv4(),
        name,
        email,
        rating,
        description
      };
      state.reviews[id].push(newReview);
    },
    [INIT_REVIEWS](state, films) {
      films.forEach(film => {
        if (!state.reviews[film.id]) state.reviews[film.id] = [];
      });
    },
    [INIT_REVIEW](state, id) {
      state.reviews = {
        ...state.reviews,
        [id]: []
      };
    }
  },
  actions: {
    async [FETCH_FILMS]({ commit, state }) {
      state.isLoading = true;
      const films = state.cachedFilms[ALL_FETCHED_FILMS];
      if (films) {
        commit(LOAD_FETCHED_FILMS, films);
        state.isSearching = false;
      } else {
        const { results } = await getFilms();
        commit(CACHE_FILMS, {
          key: ALL_FETCHED_FILMS,
          films: mapFilms(results)
        });
        commit(INIT_REVIEWS, mapFilms(results));
        commit(LOAD_FETCHED_FILMS, mapFilms(results));
      }
    },
    async [FETCH_FILM]({ commit, state }, id) {
      const films = state.cachedFilms[ALL_FETCHED_FILMS];
      if (films) {
        const film = films.find(film => film.id === id);
        commit(LOAD_FETCHED_FILM, { id, film });
      } else {
        const film = await getFilm(id);
        commit(INIT_REVIEW, id);
        commit(LOAD_FETCHED_FILM, { id, film: mapFilm(id, film) });
      }
    },
    async [SEARCH_FILMS]({ commit, state }, name) {
      state.isSearching = true;
      const films = state.cachedFilms[name];
      if (films) {
        commit(LOAD_SEARCHED_FILMS, films);
        state.isSearching = false;
      } else {
        const { results } = await searchFilm(name);
        commit(LOAD_SEARCHED_FILMS, mapFilms(results));
        commit(CACHE_FILMS, {
          key: name,
          films: mapFilms(results)
        });
      }
    }
  },
  modules: {},
  getters: {
    getFilms: state => state.films,
    getFilm: state => state.film,
    isLoading: state => {
      return state.isLoading;
    },
    isSearching: state => {
      return state.isSearching;
    },
    getReview: state => id => state.reviews[id]
  }
});
