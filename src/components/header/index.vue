<template>
  <nav class="container">
    <div>
      <router-link to="/" class="logo">Fireblogs</router-link>
    </div>
    <div class="nav-container" v-if="!isMobile">
      <router-link to="/" class="nav">Home</router-link>
      <router-link to="/blogs" class="nav">Blogs</router-link>
      <router-link to="/login" class="nav">Login/Register</router-link>
    </div>
    <div class="nav-container" v-else>
      <MenuIcon />
    </div>
  </nav>
</template>

<script>
import MenuIcon from "../../assets/Icons/bars-regular.svg";
export default {
  name: 'Header',
  components: {
    MenuIcon,
  },
  data() {
    return {
      isMobile: null
    }
  },
  created() {
    window.addEventListener('resize', this.checkSizeScreen)
    this.checkSizeScreen();
  },
  methods: {
    checkSizeScreen() {
      if(window.innerWidth <= 736) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  }
}
</script>

<style scoped>
  .container {
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 24px;
  }

  .logo {
    text-decoration: none;
    color: #000;
    font-size: 24px;
    font-weight: 600;
  }

  .nav {
    font-weight: 500;
    text-decoration: none;
    padding-inline: 8px;
    text-transform: uppercase;
    color: #000;
    transition: color .3s ease;
  }
  .nav:hover {
    color: #1eb8b8;
  }
  .nav-container {
    display: flex;
    gap: 40px;
  }
  @media only screen and (max-width: 736px){
    .nav-container {
      height: 24px;
    }
  }
</style>