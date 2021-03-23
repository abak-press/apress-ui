<template>
  <div
    class="filterable-select__options-block"
    v-if="options.length"
  >
    <ul class="filterable-select__options-list">
      <li
        class="filterable-select__option-item"
        :class="{
          'filterable-select__option-item_disabled': option.disabled,
          'filterable-select__option-item_selected': option.selected,
        }"
        :key="option.id"
        v-for="option in options"
        v-on:click="$emit('change', option)"
      >
        {{option.value}}
      </li>
    </ul>
  </div>

  <div
    class="filterable-select__options-block filterable-select__options-block_empty"
    v-else
  >
    Не найдено
  </div>
</template>

<script>
  export default {
    name: 'options-list',

    props: {
      /**
       * {Object[]} options
       * {number} options[].id
       * {string} options[].value
       * {bool} options[].selected
       * {bool} options[].disabled
       */
      options: Array,
    },

    // Emits
    // change: {Object} option
  }
</script>

<style>
  .filterable-select__options-block {
    position: absolute;
    border: 1px solid;
    width: 100%;
    top: 30px;
    background: #fff;
    z-index: 1;
    left: 0;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .filterable-select__options-list {
    list-style: none;
  }

  .filterable-select__options-block_empty {
    cursor: default;
  }

  .filterable-select__option-item_disabled {
    color: #808080;
  }

  .filterable-select__option-item_selected {
    color: #08c;
  }
</style>
