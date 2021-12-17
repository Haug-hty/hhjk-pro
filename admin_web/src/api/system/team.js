// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global'; 
const BASE_URL = netAddress

// 获取组用户
export const teamMember = (id) => {
    return request.get(`${BASE_URL}/admin/team/findById/` + id )
};


// 绑定组用户
export const teamMemberBind = (params) => {
    return request.post(`${BASE_URL}/admin/team/saveMember` ,params )
};

//评估小组信息查询
export const team_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/team/listPage`, params)
}



//评估小组信息增加/编辑
export const team_addInfo = (params) => {
    return request.post(`${BASE_URL}/admin/team/save` ,params)
}


//评估小组信息删除
export const team_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/team/deleteById/`+id)
}

