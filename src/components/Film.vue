<template>
  <div>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4" :to="'/'">
        {{ $t("Buttons.BackToList") }}
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <div>{{ film.release_date }}</div>
      <p class="display-1 text--primary">
        {{ film.title }}
      </p>
      <div class="text--primary">
        {{ film.opening_crawl }}
      </div>
      <div class="text--primary pa-3">
        <div>{{ $t("Film.Planets") }} {{ film.planets.length }}</div>
        <div>{{ $t("Film.Characters") }} {{ film.characters.length }}</div>
        <div>{{ $t("Film.Vehicles") }} {{ film.vehicles.length }}</div>
      </div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "Film",
  computed: {
    film() {
      return this.$store.getters.getFilm;
    }
  }
};
</script>
