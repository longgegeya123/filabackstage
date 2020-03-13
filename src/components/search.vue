<template>
  <div>
    <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
          searchVal:""
    };
  }
};
</script>