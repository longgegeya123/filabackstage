<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item 
      v-for="(item,key) in breadList" :key="key"
      :to="item.path"
      >
      {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadList: []
    };
  },
  created() {
    this.Breadcrumb();
  },
  methods: {
    isHome(route) {
      return route.name === "Home";
    },
    Breadcrumb() {
      let Matched = this.$route.matched;
      if (!this.isHome(Matched[0])) {
        Matched = [{ path: "/home", meta: { title: "首页" } }].concat(Matched);
      }
      this.breadList = Matched;
    }
  },
  watch: {
    $route() {
      this.Breadcrumb();
    }
  }
};
</script>
<style lang="scss" scoped>
   .el-breadcrumb{
    margin-bottom: 20px;
   }
</style>