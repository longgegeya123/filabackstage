<template>
  <div class="jurisdictionuseritem">
    <Crumbs></Crumbs>
    <el-card class="box-card">
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="rightsArr" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row
              v-for="(item1,key1) in props.row.children"
              :key="key1"
              :class="['bd-bottom','vcenter',key1==0?'bd-top':'']"
            >
              <el-col :span="5">
                <el-tag @close="removeRightById(props.row,item1.id)" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[k2==0?'':'bd-top','vcenter']"
                  v-for="(it2,k2) in item1.children"
                  :key="k2"
                >
                  <el-col :span="6">
                    <el-tag
                      @close="removeRightById(props.row,it2.id)"
                      closable
                      type="success"
                    >{{it2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      @close="removeRightById(props.row,it3.id)"
                      closable
                      type="warning"
                      v-for="(it3,k3) in it2.children"
                      :key="k3"
                    >{{it3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" @close="setRightDialogClosed" :visible.sync="setRightDialogVisible">
      <el-tree
        ref="treeRef"
        :data="TreeArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="keysArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Crumbs from "@/components/crumbs.vue";
import { mapActions } from "vuex";
export default {
  name: "JurisDicTion",
  components: { Crumbs },
  data() {
    return {
      rightsArr: [],
      setRightDialogVisible: false,
      TreeArr: [],
      keysArr: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      rightId: ""
    };
  },
  created() {
    this.getJuisDicTionUserItem();
  },
  methods: {
    ...mapActions("lxlVuex", [
      "getJuisDicTionUserItemFn",
      "RemoveJurisDicTionUserFn",
      "getTreeFn",
      "getDistriBuTionFn"
    ]),
    async getJuisDicTionUserItem() {
      let { data: res } = await this.getJuisDicTionUserItemFn();
      console.log(res);
      this.rightsArr = res.data;
    },
    removeRightById(role, id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let date = {
            role: role.id,
            rightId: id
          };
          let { data: res } = await this.RemoveJurisDicTionUserFn(date);
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg);
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          role.children = res.data;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      for (let i in node.children) {
        this.getLeafKeys(node.children[i], arr);
      }
    },
    async showSetRightDialog(scope) {
      this.rightId = scope.id;
      this.getLeafKeys(scope, this.keysArr);
      this.setRightDialogVisible = true;
      let { data: res } = await this.getTreeFn();
      console.log(res);
      this.TreeArr = res.data;
    },
    setRightDialogClosed() {
      this.keysArr = [];
    },
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      console.log(keys);
      let idkeys = keys.join(",");
      console.log(idkeys);
      let date = {
        roleId: this.rightId,
        rids: idkeys
      };
      let { data: res } = await this.getDistriBuTionFn(date);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      } else {
        return this.$message.error(res.meta.msg);
      }
      this.getJuisDicTionUserItem();
      this.setRightDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.jurisdictionuseritem {
  height: 100%;
  .bd-bottom {
    border-bottom: 1px solid #eee;
  }
  .bd-top {
    border-top: 1px solid #eee;
  }
  .el-tag {
    margin: 7px;
  }
  .vcenter {
    display: flex;
    align-items: center;
  }
}
</style>