<template>
  <button @click.prevent="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonAuth",
  props: {
    click: {
      type: Function,
      required: false,
    },
  },
};
</script>

<style scoped>
button {
  transition: all 0.5s ease;
  cursor: pointer;
  padding: 12px 24px;
  background-color: #30302e;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}
</style>