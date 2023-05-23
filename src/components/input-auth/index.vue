<template>
  <div class="input-wrap">
    <slot name="icon" class="input-icon" />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "InputAuth",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.input-wrap {
  display: flex;
  align-items: center;
  background-color: #f2f7f6;
  margin-bottom: 8px;
  border-radius: 4px;
}
.input-wrap > input {
  height: 50px;
  flex: 1;
  border: none;
  padding: 4px;
  box-sizing: border-box;
  background-color: #f2f7f6;
}
.input-wrap > input:focus {
  outline: none;
}
.input-wrap :slotted(svg) {
  flex-basis: 30px;
  width: 16px;
  height: 16px;
  margin-left: 4px;
}
</style>