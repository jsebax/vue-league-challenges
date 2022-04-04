<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <MenuLinks :links="links" />
  </div>
</template>

<script>
// @ is an alias to /src
import MenuLinks from "@/components/MenuLinks";

export default {
  name: "HomeView",
  components: {
    MenuLinks,
  },
  data() {
    return {
      links: [
        {
          title: "Text Scrambler",
          href: "/text-scrambler",
        },
        {
          title: "Credit Card",
          href: "/credit-card",
        },
      ],
    };
  },
};
</script>
