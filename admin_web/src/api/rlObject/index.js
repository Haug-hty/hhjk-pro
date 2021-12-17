// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';
const BASE_URL = netAddress

//河湖对象信息查询
export const lake_river_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/rlInfo/listPage`, params)
};

//河湖对象信息新增
export const rl_object_addInfo = (params) => {
    return request.post(`${BASE_URL}/admin/rlInfo/save`, params)
};

//河湖对象信息删除
export const rl_object_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/rlInfo/deleteById/` + id)
}

//河湖对象检测站点/断面信息查询
export const site_info_query = (params) =>{
    return request.post(`${BASE_URL}/admin/siteInfo/listPage`, params)
}


//新增河湖对象检测站点/断面信息
export const site_addInfo = (params) =>{
    return request.post(`${BASE_URL}/admin/siteInfo/save`, params)
}

//河湖对象检测站点/断面信息删除
export const site_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/siteInfo/deleteById/` + id)
}



//评估小组信息查询
export const team_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/team/listPage` ,params)
}



//评估小组信息增加/编辑
export const team_addInfo = (params) => {
    return request.post(`${BASE_URL}/admin/team/save` ,params)
}


//评估小组信息删除
export const team_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/team/deleteById/`+id)
}


//河段信息查询
export const reach_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/reachInfo/listPage`,params)
}


//河段信息新增
export const reach_info_add = (params) => {
    return request.post(`${BASE_URL}/admin/reachInfo/save`,params)
}


//河段信息删除
export const reach_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/reachInfo/deleteById/`+id)
}


//入湖排口信息新增修改
export const outLet_info_save = (params) => {
    return request.post(`${BASE_URL}/admin/rlJoinInfo/save`,params)
}

//入湖排口信息查询
export const outLet_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/rlJoinInfo/listPage`,params)
}

/** /入湖排口批量新增/修改*/
export const outLetInfoAddBatch = (params) => {
    return request.post(`${BASE_URL}/admin/rlJoinInfo/addBatch`,params)
}

/** 湖区（河段）批量新增/修改*/
export const reachInfoAddBatch = (params) => {
    return request.post(`${BASE_URL}/admin/reachInfo/addBatch`,params)
}

/** 河湖完整信息查询 */
export const rl_complete_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/rlCompleteInfo/listPage`,params)
}

/** 河湖完整信息新增/修改 */
export const rl_complete_info_save = (params) => {
    return request.post(`${BASE_URL}/admin/rlCompleteInfo/save`,params)
}


/** 河湖完整信息删除 */
export const rl_complete_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/rlCompleteInfo/deleteById/` + id)
}


/** 空间地理位置信息数据文件上传 */
export const spatial_data = (id,params) => {
    console.log("params",params)
    return request.post(`${BASE_URL}/admin/rlCompleteInfo/saveShap/` + id , params)
}