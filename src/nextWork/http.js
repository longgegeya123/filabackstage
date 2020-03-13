import Axios from 'axios';
import qs from 'qs';
import {
  Loading
} from 'element-ui';


let loading
let openLoading = function () {
  loading = Loading.service({
    lock: false,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0,0,0,0.7)'
  })
}
let closeLoading = function () {
  loading.close()
}


const instance = Axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
  timeout: 600000
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
instance.interceptors.response.use(config => {
  return config
})
class HTTP {
  get(path, data) {
    return this.init('get', path, data)
  }
  post(path, data) {
    return this.init('post', path, qs.stringify(data))
  }
  put(path, data) {
    return this.init('put', path, data)
  }
  delete(path, data) {
    return this.init('delete', path, data)
  }
  async init(methods, path, data) {
    openLoading()
    return await new Promise((resolve, reject) => {
      instance({
          method: methods,
          url: path,
          data: data,
          params: data
        }).then((res) => {
          resolve(res)
          closeLoading()
        })
        .catch((err) => {
          closeLoading()
          return reject(err)
        })
    })
  }
}
export default HTTP
