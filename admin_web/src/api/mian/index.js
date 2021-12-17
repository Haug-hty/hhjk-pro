// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global'; 
const BASE_URL = netAddress

//系统函数菜单
export const fun_list = (params) => {
    return request.post(`${BASE_URL}/admin/main/sysFunList`,params)
};


//获取version
export const version_create = () => {
    return request.get(`${BASE_URL}/admin/main/xlsVersion`)
};


//系统菜单权限列表
export const sysMenuList = () => {
    return request.post(`${BASE_URL}/admin/main/sysMenuList`)
};
