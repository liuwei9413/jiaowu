import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

//axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://60.205.115.173:8888/yitai-educational/'; //线上
Vue.prototype.staticResources = 'http://60.205.115.173:8888/yitai-educational/';//下载资源地址
// axios.defaults.baseURL = 'http://localhost:8080/'; //本地
axios.defaults.withCredentials = true; //axios发送post请求自动set cookie
//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  //_.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

export function fetch(url, params) {
  if ( !params ) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default fetch;

//添加响应拦截器
axios.interceptors.response.use(function(response){
  //对响应数据做些事
  if (response.data.code == 401){
    localStorage.removeItem('userInfo');
    location.hash = '#/login';

    // Vue.$router.push({ path: '/login',  query: ''});
  }
  return response;
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});
