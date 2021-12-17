
import request from '@/utils/request'
import { netAddress } from '../../global'; 
const BASE_URL = netAddress




// 机构用户列表
export const userOrgListSearch = (params) => {
    return request.post(`${BASE_URL}/admin/userOrg/listPage` , params)
};

// 新增机构用户
export const addUserOrg = (params) => {
    return request.post(`${BASE_URL}/admin/userOrg/save` , params)
};


// 删除当前机构用户
export const deluserOrgInfo = (id) => {
    return request.get(`${BASE_URL}/admin/userOrg/deleteById/` +id )
};
