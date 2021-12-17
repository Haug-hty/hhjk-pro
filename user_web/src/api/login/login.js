// import axios from 'axios'
import qs from 'qs'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//登录认证
export const login = (params) => {
    return request.post(`${BASE_URL}/admin/login`,qs.stringify(params))
}


//推出登录
export const loginOut = () => {
    return request.get(`${BASE_URL}/admin/logout`)
}


