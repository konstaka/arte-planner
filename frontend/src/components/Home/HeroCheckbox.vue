<template>
  <div class="checkbox_wrapper" :class="{ disabled }" @click="toggle">
    <div class="label_img_container">
      <img src="@/assets/specials.gif" class="label_img" />
    </div>
    <input
      type="checkbox"
      id="checkbox"
      :checked="value"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  name: 'HeroCheckbox',
  props: ['value', 'disabled'],
  methods: {
    toggle() {
      if (!this.disabled) {
        this.$emit('input', !this.value);
      }
    },
  },
};
</script>

<style>
.checkbox_wrapper {
  width: 20px;
  margin-left: 5px;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.checkbox_wrapper input {
  cursor: pointer;
}

.disabled,
.disabled input {
  cursor: default;
}

.label_img_container {
  position: absolute;
  top: -22px;
  width: 20px;
  overflow: hidden;
}

.label_img {
  margin-left: -36px;
}

input {
  position: absolute;
  top: -4px;
}
</style>
