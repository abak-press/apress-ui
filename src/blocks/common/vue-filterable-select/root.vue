<template>
  <div
    :class="`filterable-select ${classModifier} ${close ? '' : 'filterable-select_open'}`"
    v-click-outside="hideOptionsList"
  >
    <div
      class="filterable-select__current-value"
      v-if="close"
      v-on:click="showOptionsList"
    >
      {{currentOption.value}}

      <div class="filterable-select__close-button">
      </div>
    </div>

    <search-input
      v-show="!close"
      v-model="filterValue"
      v-on:close="hideOptionsList"
      v-on:clear="clearFilter"
      ref="search"
    ></search-input>

    <options-list
      :options="filteredOptions"
      v-if="!close"
      v-on:change="handleOptionChange"
    ></options-list>
  </div>
</template>

<script>
  import SearchInput from './search_input.vue';
  import OptionsList from './options_list.vue';
  import vClickOutside from 'v-click-outside';
  import {getFilteredOptions, getCurrentOption} from './utils';

  export default {
    name: 'filterable-select',

    directives: {
      clickOutside: vClickOutside.directive,
    },

    components: {
      'search-input': SearchInput,
      'options-list': OptionsList,
    },

    props: {
      /**
       * {Object[]} options
       * {number} options[].id
       * {string} options[].value
       * {bool} options[].selected
       * {bool} options[].disabled
       */
      options: Array,
      optionId: Number,
      classModifier: {
        type: String,
        default: '',
      },
    },

    data: function() {
      return {
        close: true,
        filterValue: '',
        currentOptionId: this.optionId,
      }
    },

    computed: {
      filteredOptions: function() {
        return getFilteredOptions(this.options, this.filterValue);
      },
      currentOption: function() {
        return getCurrentOption(this.options, this.currentOptionId);
      },
    },

    methods: {
      focuseInput: function() {
        setTimeout(() => { this.$refs.search.$el.querySelector('input').focus(); }, 0);
      },
      showOptionsList: function() {
        this.close = false;
        this.filterValue = '';
        this.focuseInput();
      },
      hideOptionsList: function() {
        this.close = true;
      },
      clearFilter: function() {
        this.filterValue = '';
        this.focuseInput();
      },
      handleOptionChange: function(option) {
        this.currentOptionId = option.id;
        this.hideOptionsList();
        this.$emit('change', option);
      },
    }
  }
</script>

<style>
  .filterable-select {
    position: relative;
    cursor: pointer;
    height: 30px;
  }

  .filterable-select__current-value {
    padding: 0 30px 0 10px;
    border: 1px solid;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }


  .filterable-select__close-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: transparent;
    border: 1px solid;
    box-sizing: border-box;
    outline: none;
  }
</style>
