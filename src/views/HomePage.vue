<template>
  <div>user: {{ user }}</div>
  <post-landing></post-landing>
</template>

<script>
import { PostLanding } from "../components";
export default {
  name: "Home",
  components: {
    "post-landing": PostLanding,
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.username;
    },
  },
};
</script>

<style>
</style>