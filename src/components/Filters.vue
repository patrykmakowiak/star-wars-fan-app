<template>
  <v-col class="d-flex" cols="12" sm="3">
    <v-select
      @change="sortBy"
      :items="items"
      :label="$t('Sorting.Title')"
      solo
      hide-details
    ></v-select>
  </v-col>
</template>

<script>
import {
  SORT_BY_TITLE_ASC,
  SORT_BY_TITLE_DESC,
  SORT_BY_DATE_ASC,
  SORT_BY_DATE_DESC
} from "@/store/mutations.type";

export default {
  data() {
    return {
      items: [
        this.$i18n.t("Sorting.Type.ByTitleAsc"),
        this.$i18n.t("Sorting.Type.ByTitleDesc"),
        this.$i18n.t("Sorting.Type.ByDateAsc"),
        this.$i18n.t("Sorting.Type.ByDateDesc")
      ]
    };
  },
  methods: {
    sortBy(value) {
      switch (value) {
        case this.$i18n.t("Sorting.Type.ByTitleAsc"):
          this.$store.commit(SORT_BY_TITLE_ASC);
          break;
        case this.$i18n.t("Sorting.Type.ByTitleDesc"):
          this.$store.commit(SORT_BY_TITLE_DESC);
          break;
        case this.$i18n.t("Sorting.Type.ByDateAsc"):
          this.$store.commit(SORT_BY_DATE_ASC);
          break;
        case this.$i18n.t("Sorting.Type.ByDateDesc"):
          this.$store.commit(SORT_BY_DATE_DESC);
          break;
      }
    }
  }
};
</script>
