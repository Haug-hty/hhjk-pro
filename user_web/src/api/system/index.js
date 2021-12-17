// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

// 获取组用户
export const teamMember = (id) => {
    return request.get(`${BASE_URL}/admin/team/findById/` + id )
};


// 绑定组用户
export const teamMemberBind = (params) => {
    return request.post(`${BASE_URL}/admin/team/saveMember` ,params )
};


// 获取当前用户信息
export const getUserProfile = () => {
    return request.get(`${BASE_URL}/admin/user/findCurrentUserInfo` )
};

/** 修改用户基本信息 */
export const updateUserProfile = (params) => {
    return request.post(`${BASE_URL}/admin/user/save`,params )
};

/** 修改用户密码*/
export const updateUserPwd = (params) => {
    return request.post(`${BASE_URL}/admin/user/changePwd`,params )
};