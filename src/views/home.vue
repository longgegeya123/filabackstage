<template>
  <div class="home">
    <el-container class="container_box">
      <el-header class="container_myHeader">
        <div class="container_myHeader_left">
          <img src="http://www.fila.cn/themes/pc/fila/images/common_180905/fila_blue_150.png" />
        </div>
        <div class="container_myHeader_right">
          <img src="../assets/f9673da9fe04a1e.gif" />
          <span>{{username}}</span>
          <el-button type="primary" size="small" @click="exit">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse==true?'64px':'200px'" class="container_left">
          <div class="toggle_button">
            <i class="el-icon-s-operation" @click="toggle_btn"></i>
          </div>
          <el-menu
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="rgba(44,104,255,1)"
            :unique-opened="true"
            router
            active-text-color="white"
            :collapse-transition="false"
            :default-active="$route.path"
          >
            <el-submenu :index="item.id+''" v-for="(item) in menuArr" :key="item.id">
              <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span slot="title">{{item.authName}}</span>
              </template>
              <el-menu-item v-for="(it) in item.children" :key="it.id" :index="'/'+it.path">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{it.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="container_right">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      menuArr: [],
      iconObj: {
        "125": "el-icon-user",
        "103": "el-icon-s-grid",
        "101": "el-icon-s-management",
        "102": "el-icon-goods",
        "145": "el-icon-s-data"
      }
    };
  },
  computed: {
    ...mapState("lxlVuex", ["username"])
  },
  methods: {
    ...mapActions("lxlVuex", ["getMenusFn"]),
    async getMenu() {
      let { data: res } = await this.getMenusFn();
      this.menuArr = res.data;
    },
    exit() {
      window.sessionStorage.clear("token");
      this.$router.push("/Login");
    },
    toggle_btn() {
      this.isCollapse = !this.isCollapse;
    }
  },
  created() {
    this.getMenu();
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .container_box {
    height: 100%;
    .container_myHeader {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      .container_myHeader_left {
        display: flex;
        align-items: center;
        
        img{
          height: 27px;
        }
      }
      .container_myHeader_right {
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 42px;
          border-radius:50%;
          border: 2px solid #409EFF;
          padding:2px;
          box-sizing: border-box;
        }
        span {
          font-size: 14px;
          font-family: DINCond-Medium, DINCond;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          margin: 0 10px;
        }
      }
    }
    .container_left {
      background: rgba(44, 104, 255, 1);
      .el-menu {
        border-right: none;
        li {
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          font-family: PingFangSC-Medium, PingFang SC;
        }
        .el-submenu__title {
          span,
          i {
            @extend li;
          }
        }
        .el-icon-menu {
          @extend li;
        }
      }
    }
    .container_right {
      background: rgba(243, 245, 252, 1);
    }
  }
}
.toggle_button {
  font-size: 20px;
  font-weight: 800;
  color: white;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
  i {
    cursor: pointer;
  }
}
</style>