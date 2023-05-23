<template>
  <div>user: {{ user }}</div>
  <post-landing></post-landing>
  <post-landing v-for="blog in blogList" :post="blog"></post-landing>
  {{ blogList }}
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
  created() {
    this.$store.dispatch("getBlogList");
  },
  computed: {
    user() {
      return this.$store.state.username;
    },
    blogList() {
      return this.$store.state.blogList;
    },
  },
};
</script>

<style></style>
