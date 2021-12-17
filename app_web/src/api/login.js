// import axios from 'axios'
import request from '@/utils/request'
import qs from 'qs'
// web项目打包部署使用
const BASE_URL = '/api'
// 手机app项目，apk安装包使用
// const BASE_URL ='http://1.13.9.113:7002/hhjk'

export const loginIn = (params) =>{
    return request.post(`${BASE_URL}/admin/login`,qs.stringify(params))
}