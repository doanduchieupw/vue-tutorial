<template>
  <RouterView />
</template>

<script>
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";

export default {
  name: "App",
  components: {},
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch("getCurrentUser", user);
      }
    });
  },
};
</script>

<style>
</style>