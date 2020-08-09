<template>
  <v-container>
    <v-row justify="center" class="mx-sm-4">
      <v-col
        v-for="(film, i) in films"
        :key="`${i}-${film.episode_id}`"
        cols="12"
        md="4"
      >
        <v-card
          outlined
          height="100%"
          class="d-flex flex-wrap align-content-space-between mx-auto"
        >
          <v-card-text>
            <div>{{ film.release_date }}</div>
            <p class="display-1 text--primary">
              {{ film.title }}
            </p>
            <div class="text--primary">
              {{ film.opening_crawl }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4" :to="`/film/${film.id}`">
              {{ $t("Buttons.MoreDetails") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FilmList",
  computed: {
    films() {
      return this.$store.getters.getFilms;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>
