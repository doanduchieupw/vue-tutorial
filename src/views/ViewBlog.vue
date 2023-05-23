<template>
  <div class="blog-container">
    <h2 class="blog-title">{{ blog.title }}</h2>
    <p class="blog-created">
      Posted on:
      {{ new Date(blog.createdAt.seconds * 1000).toLocaleString("vi") }}
    </p>
    <p class="blog-author">Author: {{ blog.user }}</p>
    <img :src="blog.cover" alt="" class="blog-cover" />
    <div v-html="blog.content" class="blog-content"></div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  created() {
    this.$store.dispatch(
      "getBlog",
      window.location.pathname.replace("/view/", "")
    );
  },
  computed: {
    blog() {
      return this.$store.state.currentBlog;
    },
  },
};
</script>

<style scoped>
.blog-container {
  padding: 60px 25px;
}
.blog-title {
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 32px;
}
.blog-created {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 24px;
}
.blog-author {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 8px;
}
.blog-cover {
  width: 100%;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.blog-content ::v-deep p {
  margin: 0 auto 20px;
  max-width: 568px;
  width: 100%;
  line-height: 1.42;
}
.blog-content ::v-deep figure {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.blog-content ::v-deep img {
  max-width: 567px;
  width: 100%;
  margin: auto;
}

.blog-content ::v-deep figcaption {
  margin: 8px 16px 32px;
  color: #757575;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  text-align: center;
}
</style>
