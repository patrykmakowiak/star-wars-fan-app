<template>
  <div class="film">
    <v-container>
      <v-card class="mx-auto" max-width="1170">
        <Film />
        <Review />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Film from "@/components/Film.vue";
import Review from "@/components/Review.vue";
import { FETCH_FILM } from "@/store/actions.type";

export default {
  name: "Test",
  components: {
    Film,
    Review
  },
  mounted() {
    this.$store.dispatch(FETCH_FILM, +this.$route.params.id);
  }
};
</script>
