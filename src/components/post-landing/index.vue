<template>
  <div class="wrapper">
    <div class="post-content" :class="{ 'post-content-dark': !isUser, }">
      <div>
        <h2 v-if="!isUser" class="post-title"> {{ landing.title }}</h2>
        <h2 v-else class="post-title"> {{ post.title }}</h2>
        <p v-if="!isUser" class="post-description">{{ landing.description }}</p>
        <p v-else class="post-description">{{ post.description }}</p>
        <router-link v-if="!isUser" to="landing.to" class="post-link">{{ landing.link }} <Arrow /></router-link>
        <router-link v-else to="post.to" class="post-link">{{ post.link }} <Arrow /></router-link>
      </div>
    </div>
    <div class="post-photo">
      <img v-if="!isUser" :src="landing.image" :alt="landing.title">
      <img v-else :src="post.image" :alt="post.title">
    </div>
  </div>
</template>

<script>
import { landingContent } from '../../constant'
import Arrow from "../../assets/Icons/arrow-right-light.svg"

export default {
  name: 'PostLanding',
  components: {
    Arrow, 
  },  
  data: function() {
    return {
      landing: landingContent,
    }
  },
  props: {
    post: {
      title: String,
      description: String,
      link: String,
      to: String,
      image: String,
      direction: {
        validator: function (value) {
        return ['rtl', 'ltr'].includes(value)
      }
      }
    }
  }
}
</script>

<style scoped>
  .wrapper {
    min-height: 650px;
    max-height: 650px;
    display: flex;
    overflow: hidden;
  }
  .post-content {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .post-content-dark {
    background-color: #303030;
    color: #fff;
  }
  .post-content > div {
    max-width: 375px;
    padding-inline: 24px;
  }
  .post-title {
    text-transform: uppercase;
    font-size: 40px;
    font-weight: 300;
    margin-bottom: 24px;
  }
  .post-description {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
  }
  .post-link {
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none;
    margin-top: 32px;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    transition: all 0.5s ease-in;
    color: #fff;
  }
  .post-link:hover {
    border-color: #fff;
  }
  .post-link > svg {
    width: 12px;
    margin-left: 8px;
  }
  .post-photo {
    flex: 4
  }
  .post-photo > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>