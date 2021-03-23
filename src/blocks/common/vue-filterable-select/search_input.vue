<template>
  <div class="filterable-select__search-block">
    <input
      class="filterable-select__search-input"
      type="text"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
    <button
      class="filterable-select__clear-button"
      v-if="!!value"
      v-on:click="$emit('clear')"
    ></button>
    <button
      class="filterable-select__close-button"
      v-on:click="$emit('close')"
    ></button>
  </div>
</template>

<script>
  export default {
    name: 'search-input',

    props: {
      value: String,
    },

    // Emits
    // input: string
    // close: null
  };
</script>

<style>
  .filterable-select__search-block {
    border: 1px solid;
    height: 100%;
    box-sizing: border-box;
  }

  .filterable-select__search-input {
    display: block;
    height: 100%;
    width: calc(100% - 50px);
    border: none;
    outline: none;
    padding: 0 50px 0 10px;
    cursor: text;
  }

  .filterable-select__clear-button {
    position: absolute;
    top: 0;
    right: 20px;
    width: 20px;
    height: 100%;
    background: transparent;
    border: 1px solid;
    box-sizing: border-box;
    outline: none;
  }
</style>
