import request from '@/utils/request'
import { netAddress } from '../../global'; 
const BASE_URL = netAddress

// 机构列表
export const listRole = (params) => {
    return request.post(`${BASE_URL}/admin/role/listPage` , params)
};

// 新增机构
export const addRole = (params) => {
    return request.post(`${BASE_URL}/admin/role/save` , params)
};


// 修改机构
export const updateRole = (params) => {
    return request.post(`${BASE_URL}/admin/role/save` , params)
};


// 修改机构
export const delRole = (id) => {
    return request.get(`${BASE_URL}/admin/role/deleteById/` + id )
};

// 获取角色权限信息
export const getRolePermission = (id) => {
    return request.get(`${BASE_URL}/admin/role/findById/` + id )
};


// 修改机构
export const dataScope = (params) => {
    return request.post(`${BASE_URL}/admin/roleAuthority/saveBatch` , params)
};