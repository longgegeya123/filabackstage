<template>
  <div class="juisdictionitem">
    <Crumbs></Crumbs>
    <el-card class="box-card">
      <el-table stripe :data="rightsArr" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==='0'" type>一级</el-tag>
            <el-tag v-if="scope.row.level==='1'" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level==='2'" type="info">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import Crumbs from "@/components/crumbs.vue";
import { mapActions } from "vuex";
export default {
  name: "JurisDicTionItem",
  components: { Crumbs },
  data() {
    return {
      rightsArr: [],
      tagType: ""
    };
  },
  methods: {
    ...mapActions("lxlVuex", ["getRightsFn"]),
    async getRight() {
      let { data: res } = await this.getRightsFn();
      console.log(res);
      this.rightsArr = res.data;
    }
  },
  created() {
    this.getRight();
  }
};
</script>
<style lang="scss" scoped>
</style>