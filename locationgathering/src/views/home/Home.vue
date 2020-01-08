<template>
  <div class="home">
    <router-view></router-view>
    <v-tabbar></v-tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";

export default {
  name: "home",
  components: {
    vTabbar: tabbar
  },
  created() {
    // this.$store.state.tabbarActiveIndex = 0;
  },
  activated(){
  }
};
</script>

