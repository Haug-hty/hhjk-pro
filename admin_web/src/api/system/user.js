// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global'; 
const BASE_URL = netAddress




// 用户列表
export const listUser = (params) => {
    return request.post(`${BASE_URL}/admin/user/listPage` , params)
};

// 新增用户
export const addUser = (params) => {
    return request.post(`${BASE_URL}/admin/user/save` , params)
};


// 修改用户
export const updateUser = (params) => {
    return request.post(`${BASE_URL}/admin/user/save` , params)
};


// 修改用户
export const delUser = (id) => {
    return request.get(`${BASE_URL}/admin/user/deleteById/` + id )
};


// 密码修改
export const resetUserPwd = (params) => {
    return request.post(`${BASE_URL}/admin/user/changePwd` , params )
};

// 获取当前登录用户信息
export const userInfo = () => {
    return request.get(`${BASE_URL}/admin/user/findCurrentUserInfo` )
};

/** 获取用户-角色信息 */
export const getUserRole = (params) => {
    return request.post(`${BASE_URL}/admin/userRole/listPage` , params)
};


/** 保存或修改用户-角色信息 */
export const userRoleSave = (params) => {
    return request.post(`${BASE_URL}/admin/userRole/save` , params)
};

// 获取当前用户信息
export const getUserProfile = () => {
    return request.get(`${BASE_URL}/admin/user/findCurrentUserInfo` )
};

/** 修改用户基本信息 */
export const updateUserProfile = (params) => {
    return request.post(`${BASE_URL}/admin/user/save`,params )
};