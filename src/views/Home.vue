<template>
  <div class="home">
    <v-container>
      <v-row justify="space-between" class="mx-sm-4">
        <Search />
        <Filters />
      </v-row>
    </v-container>
    <FilmList />
  </div>
</template>

<script>
import FilmList from "@/components/FilmList.vue";
import Filters from "@/components/Filters.vue";
import Search from "@/components/Search.vue";
import { FETCH_FILMS } from "@/store/actions.type";

export default {
  name: "Home",
  components: {
    Filters,
    FilmList,
    Search
  },
  mounted() {
    this.$store.dispatch(FETCH_FILMS);
  }
};
</script>
