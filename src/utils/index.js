import axios from 'axios';
import * as Cookies from 'js-cookie'

// let env = process.env.NODE_ENV == 

const baseURL = '/'

const instance = axios.create({
  baseURL,
  timeout:10000
})

instance.interceptors.request.use( 
  config => {
    let userKey = Cookies.get("userKey")
    if (userKey) {  // 判断是否存在userKey，如果存在的话，则每个http header都加上userKey
        config.headers.userKey = userKey;
    }
    return config;
},
  error  => {
      return Promise.reject(error );
  }
)

const xhr = {
  get(url,data,config){
    return new Promise((resolve, reject) => {
      instance.get(url,data,config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    }) 
  },
  post(url, data, config){
    return new Promise((resolve, reject) => {
      instance.post(url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}


export const $axios = xhr;