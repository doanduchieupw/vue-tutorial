<template>
  <header-main></header-main>
  <router-view />
</template>

<script>
import { Header } from '../../components'
export default {
  name: 'Main',
  components: {
    'header-main': Header
  }
}
</script>

<style>

</style>