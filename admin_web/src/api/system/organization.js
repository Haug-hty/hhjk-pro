// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';
const BASE_URL = netAddress




// 机构列表
export const listOrganization = (params) => {
    return request.post(`${BASE_URL}/admin/organization/listPage` , params)
};

// 新增机构
export const addOrganization = (params) => {
    return request.post(`${BASE_URL}/admin/organization/save` , params)
};


// 修改机构
export const updateOrganization = (params) => {
    return request.post(`${BASE_URL}/admin/organization/save` , params)
};


// 修改机构
export const delOrganization = (id) => {
    return request.get(`${BASE_URL}/admin/organization/deleteById/` + id )
};