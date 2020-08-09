<template>
  <div class="pb-4">
    <p class="text-h6 text--primary ma-4">
      {{ $t("Reviews.Title") }}
    </p>
    <v-row class="mx-4">
      <v-alert
        v-if="reviews && !reviews.length"
        border="left"
        colored-border
        type="info"
        elevation="1"
      >
        {{ $t("Reviews.NoReviews") }}
      </v-alert>
      <v-col v-for="review in reviews" :key="review.id" cols="12" md="4">
        <v-card
          outlined
          height="100%"
          class="d-flex flex-wrap align-content-space-between mx-auto"
        >
          <v-card-text>
            <div class="d-flex flex-wrap justify-space-between align-center">
              <div class="text-h6">{{ review.name }}</div>
              <v-rating readonly v-model="review.rating"></v-rating>
            </div>
            <blockquote class="blockquote">
              {{ review.description }}
            </blockquote>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card outlined class="mx-4 mx-sm-auto my-sm-4" max-width="500">
      <v-card-text>
        <p class="text-h6 text--primary">
          {{ $t("Reviews.AddReview") }}
        </p>
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :label="$t('Reviews.Name')"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            :label="$t('Reviews.Email')"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <div class="text-center">
            <v-rating v-model="rating"></v-rating>
          </div>
          <v-textarea
            v-model="description"
            :error-messages="descriptionErrors"
            :label="$t('Reviews.Description')"
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
          ></v-textarea>
          <div class="my-2 d-flex justify-end">
            <v-btn class="mr-4" color="secondary" @click="clear">
              {{ $t("Reviews.Clear") }}</v-btn
            >
            <v-btn color="primary" @click="submit">{{
              $t("Reviews.AddReview")
            }}</v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { ADD_REVIEW } from "@/store/mutations.type";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    description: { required }
  },

  data: () => ({
    name: "",
    email: "",
    description: "",
    rating: 1
  }),
  computed: {
    reviews() {
      return this.$store.getters.getReview(+this.$route.params.id);
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      !this.$v.name.required &&
        errors.push(this.$i18n.t("Reviews.Errors.RequiredName"));
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      !this.$v.email.email &&
        errors.push(this.$i18n.t("Reviews.Errors.EmailValid"));
      !this.$v.email.required &&
        errors.push(this.$i18n.t("Reviews.Errors.RequiredEmail"));
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.required &&
        errors.push(this.$i18n.t("Reviews.Errors.RequiredDescription"));
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.$store.commit(ADD_REVIEW, {
        id: +this.$route.params.id,
        name: this.name,
        email: this.email,
        rating: this.rating,
        description: this.description
      });
      this.clear();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.description = "";
      this.rating = 1;
    }
  }
};
</script>
