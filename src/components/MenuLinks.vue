<template>
  <div class="menu-links">
    <h1>Vue League Challenges</h1>
    <p>List of challenges for the Vue League</p>
    <ul>
      <li v-for="(link, idx) in links" :key="idx">
        <router-link :to="link.href">{{ link.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MenuLinks",
  props: {
    links: Array,
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
