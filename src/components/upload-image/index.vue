<template>
  <img :src="imageUrl" v-if="imageUrl" class="upload-image" />
  <div class="upload-container" v-if="!imageUrl">
    <label for="upload-input">
      Upload cover
      <input
        type="file"
        id="upload-input"
        @change="submit"
        class="upload-input"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "UploadImage",
  props: ["imageUrl"],
  methods: {
    submit(event) {
      this.$emit("upload-file", event);
    },
  },
};
</script>

<style scoped>
.upload-container {
  background-color: #ccc;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 25px;
}
.upload-container > label {
  cursor: pointer;
}
.upload-input {
  display: none;
}
.upload-image {
  width: 240px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
}
.upload-image:hover {
  opacity: 0.7;
  transition: all 0.3s linear;
  cursor: pointer;
}
</style>
