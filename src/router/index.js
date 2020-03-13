import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/views/Login.vue');
const Home = () => import('@/views/home.vue');
const View = () => import('@/views/view.vue');
const UserItem = () => import('@/views/userItem.vue');
const JurisDicTionUserItem = () => import('@/views/jurisdictionuseritem.vue');
const JurisDicTionItem = () => import('@/views/jurisdictionitem.vue');
const ReportFors = () => import('@/views/reportFors.vue');
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      name: "Home",
      component: Home,
      meta: {
        title: "首页"
      },
      children: [{
          path: "/view",
          name: "View",
          component: View,
        },
        {
          path: "/users",
          name: "UserItem",
          component: UserItem,
          meta: {
            title: "用户列表"
          }
        },
        {
          path:"/roles",
          name:"JurisDicTionUserItem",
          component:JurisDicTionUserItem,
          meta:{
            title:"角色列表"
          }
        },
        {
          path:"/rights",
          name:"JurisDicTionItem",
          component:JurisDicTionItem,
          meta:{
            title:"权限列表"
          }
        },
        {
          path:"/reports",
          name:"ReportFors",
          component:ReportFors,
          meta:{
            title:"数据报表"
          }
        },
        {
          path: "/home",
          redirect: "/view"
        }
      ]
    },
    {
      path: '/',
      redirect: '/Login'
    }

  ]
})
