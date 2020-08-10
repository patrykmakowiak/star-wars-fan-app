<template>
  <v-col cols="12" sm="6">
    <v-form @submit="search">
      <v-text-field
        solo
        :loading="isSearching"
        :label="$t('Searching.Title')"
        prepend-inner-icon="mdi-magnify"
        v-model="keyword"
        @input="debounce(searchDebounce, 600)"
        hide-details
      ></v-text-field>
    </v-form>
  </v-col>
</template>

<script>
import { SEARCH_FILMS } from "@/store/actions.type";

export default {
  name: "Search",
  data() {
    return {
      keyword: "",
      timeout: undefined
    };
  },
  computed: {
    isSearching() {
      return this.$store.getters.isSearching;
    }
  },
  methods: {
    searchDebounce() {
      this.$store.dispatch(SEARCH_FILMS, this.keyword);
    },
    search(e) {
      this.$store.dispatch(SEARCH_FILMS, this.keyword);
      e.preventDefault();
      clearTimeout(this.timeout);
    },
    debounce(func, timeout) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        func.apply(this);
      }, timeout);
    }
  }
};
</script>
