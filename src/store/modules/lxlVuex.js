import {
  Login,
  Menus,
  Users,
  Put,
  ChangeUser,
  ChangeUserName,
  setRole,
  AddUser,
  deleteUser,
  JurisDicTionUser,
  RemoveJurisDicTionUser,
  TreeJursiDicTionUserItem,
  distriBuTionJuris,
  JurisDicTionItem,
  myChart
} from '../../nextWork/index';
const state = {
  username: "admin"
};
const mutations = {
  GetUserName(state, data) {
    state.username = data;
    console.log(state)
  }
};
const actions = {
  async UserLogin({
    commit,
    state
  }, data) {
    let LoginData = await Login(data)
    return LoginData;
  },
  async getMenusFn() {
    let data = await Menus();
    return data;
  },
  async getUsersFn({
    commit,
    state
  }, data) {
    let userData = await Users(data)
    return userData;
  },
  async getPut({
    commit,
    state
  }, data) {
    let putData = await Put(data);
    return putData;
  },
  async getChangeUser({
    commit,
    state
  }, data) {
    let changeData = await ChangeUser(data)
    return changeData;
  },
  async getChangeUserNameFn({
    commit,
    state
  }, data) {
    console.log(data)
    let uNdata = await ChangeUserName(data)
    return uNdata;
  },
  async getSetRoleFn() {
    let data = await setRole();
    return data;
  },
  async getAddUserFn({
    commit,
    state
  }, data) {
    console.log(data)
    let AddData = await AddUser(data);
    return AddData;
  },
  async getDeleteUserFn({
    commit,
    state
  }, id) {
    let data = await deleteUser(id)
    return data;
  },
  async getJuisDicTionUserItemFn() {
    let data = await JurisDicTionUser();
    return data;
  },
  async RemoveJurisDicTionUserFn({}, data) {
    console.log(data)
    let RemoveData = await RemoveJurisDicTionUser(data);
    return RemoveData;
  },
  async getTreeFn() {
    let data = await TreeJursiDicTionUserItem();
    return data;
  },
  async getDistriBuTionFn({}, data) {
    let DistriBuTion = await distriBuTionJuris(data);
    return DistriBuTion;
  },
  async getRightsFn() {
    let data = await JurisDicTionItem();
    return data;
  },
  async getMyChartFn(){
      let data = await myChart();
      return data;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
