import Http from './http';
const http = new Http();
export const Login = (data)=>http.post('login',data);
export const Menus = () => http.get('menus');
export const Users = (data) => http.get('users',data);
export const Put = (data) => http.put(data);
export const ChangeUser = (data) => http.get(data);
export const ChangeUserName = (data) => http.put(`users/${data.id}`,data)
export const setRole = () => http.get('roles');
export const AddUser = (data) => http.post('users',data);
export const deleteUser = (id) => http.delete(`users/${id}`,id);
export const JurisDicTionUser = () => http.get('roles');
export const RemoveJurisDicTionUser = (data) => http.delete(`roles/${data.role}/rights/${data.rightId}`);
export const TreeJursiDicTionUserItem = () => http.get('rights/tree');
export const distriBuTionJuris = (data) => http.post(`roles/${data.roleId}/rights`,data);
export const JurisDicTionItem = () => http.get('rights/list');
export const myChart = () => http.get('reports/type/1');