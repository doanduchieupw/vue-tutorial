<template>
  <div class="blog-card-container">
    <img :src="blog.cover" :alt="blog.title" class="blog-cover" />
    <div class="blog-info">
      <h4>{{ blog.title }}</h4>
      <h6>Posted on: {{ blog.createdAt }}</h6>
      <router-link :to="to">View the post <Arrow /></router-link>
    </div>
  </div>
</template>

<script>
import Arrow from "../../assets/Icons/arrow-right-light.svg";
export default {
  name: "PostCard",
  components: {
    Arrow,
  },
  props: {
    blog: {
      id: String,
      cover: String,
      title: String,
      createdAt: String,
    },
  },
  computed: {
    to() {
      return `/view/${this.blog.id}`;
    },
  },
};
</script>

<style scoped>
.blog-card-container {
  min-height: 420px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s ease-in;
}
.blog-card-container:hover {
  opacity: 0.8;
}
.blog-cover {
  display: block;
  width: 100%;
  min-height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.blog-info {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 16px;
  color: #000;
}
.blog-info > h4 {
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: 300;
}

.blog-info > h6 {
  font-weight: 400;
  font-size: 12px;
  padding-bottom: 16px;
}
.blog-info > a {
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  font-weight: 500;
  padding-top: 20px;
  font-size: 12px;
  padding-bottom: 4px;
  transition: all 0.5s ease-in;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  color: #000;
}

.blog-info > a > svg {
  width: 12px;
  margin-left: 8px;
}
</style>
