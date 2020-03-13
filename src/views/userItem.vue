<template>
  <div class="userItem">
    <Crumbs></Crumbs>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            @clear="getUser"
            placeholder="请输入内容"
            clearable
            v-model="queryInfo.query"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click=" dialogaAddUser = true">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userArr" border stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-tooltip placement="top" content="修改用户" :enterable="false">
              <el-button
                type="primary"
                @click="changeItem(scope.row)"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <el-tooltip placement="top" content="删除用户" :enterable="false">
              <el-button
                type="danger"
                size="mini"
                @click="deleteUser(scope.row)"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
            <el-tooltip placement="top" content="分配角色" :enterable="false">
              <el-button
                type="warning"
                size="mini"
                @click="allocation(scope.row)"
                icon="el-icon-s-tools"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next,total,jumper"
        :page-size="queryInfo.pagesize"
        :current-page="queryInfo.pagenum"
        @size-change="handelChangeSize"
        @current-change="handelChangePage"
        :pager-count="7"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible" @close="editDialogClosed">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="changeRules"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名">
          <el-input :disabled="true" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emialVal">
          <el-input v-model="ruleForm.emialVal"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input v-model.number="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogallocation"></el-dialog>
    <!-- 添加用户 -->
    <el-dialog width="50%" title="添加用户" @close="addDialogClosed" :visible.sync="dialogaAddUser">
      <el-form
        label-width="80px"
        class="addUserForm"
        :model="formLabelAlignAdd"
        ref="formLabelAlignAddRef"
        :rules="AddRules"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model.trim="formLabelAlignAdd.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model.trim="formLabelAlignAdd.password"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formLabelAlignAdd.email"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input v-model.number="formLabelAlignAdd.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog_footer">
        <el-button @click="dialogaAddUser=false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Crumbs from "@/components/crumbs.vue";
import { mapActions } from "vuex";
export default {
  name: "UserItem",
  components: { Crumbs },
  data() {
    var handelEmial = (rule, value, cb) => {
      const regEail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (regEail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    var handelMobile = (rule, value, cb) => {
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("您输入的手机格式不正确"));
    };
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 3
      },
      total: 0,
      userArr: [],
      dialogFormVisible: false,
      dialogallocation: false,
      dialogaAddUser: false,
      ruleForm: {
        emialVal: "",
        username: "",
        mobile: "",
        id: ""
      },
      changeRules: {
        emialVal: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: handelEmial, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: handelMobile, trigger: "blur" }
        ]
      },
      formLabelAlignAdd: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      AddRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            required: true,
            min: 3,
            max: 6,
            message: "用户名长度在3-6位之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            required: true,
            min: 6,
            max: 15,
            message: "密码长度在6-15位之间",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: handelEmial, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: handelMobile, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions("lxlVuex", [
      "getUsersFn",
      "getPut",
      "getChangeUser",
      "getChangeUserNameFn",
      "getSetRoleFn",
      "getAddUserFn",
      "getDeleteUserFn"
    ]),
    async getUser() {
      let params = this.queryInfo;
      let { data: res } = await this.getUsersFn(params);
      this.total = res.data.total;
      this.pagenum = res.data.pagenum;
      this.userArr = res.data.users;
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
    },
    //修改状态
    async userStateChanged(scope) {
      console.log(scope);
      let path = `/users/${scope.id}/state/${scope.mg_state}`;
      let { data: res } = await this.getPut(path);
      console.log(res);
      if (res.meta.status == 200) {
        this.$message({
          message: res.meta.msg,
          type: "success"
        });
      } else {
        return this.$message.error(res.meta.msg);
      }
    },
    handelChangeSize(val) {
      this.queryInfo.pagesize = val;
      this.getUser();
    },
    handelChangePage(val) {
      this.queryInfo.pagenum = val;
      this.getUser();
    },
    async changeItem(scope) {
      let data = `users/${scope.id}`;
      let { data: res } = await this.getChangeUser(data);
      this.ruleForm.id = res.data.id;
      this.ruleForm.username = res.data.username;
      this.ruleForm.emialVal = res.data.email;
      this.ruleForm.mobile = res.data.mobile;
      this.dialogFormVisible = true;
    },
    editUser() {
      this.$refs.ruleFormRef.validate(async valid => {
        if (valid) {
          let { data: res } = await this.getChangeUserNameFn({
            id: this.ruleForm.id,
            email: this.ruleForm.emialVal,
            mobile: this.ruleForm.mobile
          });
          if (res.meta.status == 200) {
            this.$message({
              message: res.meta.msg,
              type: "success"
            });
          } else {
            return this.$message.error(res.meta.msg);
          }
          this.getUser();
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    editDialogClosed() {
      this.$refs.ruleFormRef.resetFields();
    },
    //分配角色
    async allocation(scope) {
      this.dialogallocation = true;
      let { data: res } = await this.getSetRoleFn();
      console.log(res);
    },
    //添加用户
    addUser() {
      this.$refs.formLabelAlignAddRef.validate(async valid => {
        if (valid) {
          this.dialogaAddUser = false;
          let { data: res } = await this.getAddUserFn(this.formLabelAlignAdd);
          console.log(res);
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
          if (res.meta.status !== 201) {
            return this.$message.error("创建失败");
          }
        } else {
          return false;
        }
      });
    },
    addDialogClosed() {
      this.$refs.formLabelAlignAddRef.resetFields();
    },
    // 删除用户
    async deleteUser(scope) {
      console.log(scope);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: res } = await this.getDeleteUserFn(scope.id);
          console.log(res);
          if (res.meta.status) {
            this.$message({
              message: res.meta.msg,
              type: "success"
            });
          }
           this.getUser();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getUser();
  }
};
</script>
<style lang="scss" scoped>
.userItem {
  height: 100%;
  .box-card {
    .el-card__body {
      .el-table,
      .el-pagination {
        margin-top: 20px;
      }
      .el-pagination {
      }
    }
  }
}
</style>