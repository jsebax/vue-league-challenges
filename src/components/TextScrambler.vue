<template>
  <div class="text-scrambler">
    <textarea
      class="text-scrambler__area"
      v-model="text"
      name="visible-text"
      id="visible-text"
      cols="30"
      rows="10"
    ></textarea>
    <button class="text-scrambler__button" @click="toggleHiddenText">
      {{ buttonText }}
    </button>
    <textarea
      v-show="showHiddenText"
      v-model="reverseText"
      name="hidden-text"
      id="hidden-text"
      cols="30"
      rows="10"
      disabled
    ></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHiddenText: false,
      text: "",
    };
  },
  computed: {
    buttonText() {
      return `${this.showHiddenText ? "Hide" : "Show"} Secret`;
    },
    reverseText() {
      return [...this.text].reverse().join("");
    },
  },
  methods: {
    toggleHiddenText() {
      this.showHiddenText = !this.showHiddenText;
    },
  },
};
</script>

<style scoped lang="scss">
.text-scrambler {
  display: flex;
  flex-direction: column;
  max-width: 50vw;
  margin: 0 auto;

  &__area {
    &:focus {
      outline-color: #42b983;
    }
  }

  &__button {
    margin: 20px 0;
  }
}
</style>
