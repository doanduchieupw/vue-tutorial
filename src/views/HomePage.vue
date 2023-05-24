<template>
  <post-landing></post-landing>
  <!-- <post-landing v-for="blog in blogList" :post="blog"></post-landing> -->
  <div class="container">
    <h3>View More Recent Blogs</h3>
    <div class="blog-card-wrap">
      <post-card
        v-for="blog in blogList"
        :blog="blog"
        :key="blog.id"
      ></post-card>
    </div>
  </div>
</template>

<script>
import { PostCard, PostLanding } from "../components";
export default {
  name: "Home",
  components: {
    "post-landing": PostLanding,
    "post-card": PostCard,
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
      const blogList = this.$store.state.blogList;
      const blogListConvert = blogList.map((blog) => ({
        title: blog.title,
        cover: blog.cover,
        id: blog.id,
        createdAt: new Date(blog.createdAt.seconds * 1000).toLocaleString("vi"),
      }));
      return blogListConvert;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 100px 16px;
  background-color: #f1f1f1;
}
.container > h3 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}
.blog-card-wrap {
  display: grid;
  column-gap: 32px;
  row-gap: 32px;
  grid-template-columns: repeat(4, 1fr);
}
</style>
