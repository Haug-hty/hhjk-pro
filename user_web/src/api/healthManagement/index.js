// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//治理建议库信息查询
export const suggestion_table_search = (params) => {
    return request.post(`${BASE_URL}/admin/repairSuggest/listPage`,params)
};

//新增治理建议库信息
export const suggestion_newInfo_submit = (params) => {    
    return request.post(`${BASE_URL}/admin/repairSuggest/save`,params)
};

//编辑治理建议库信息
export const suggestion_editInfo = (params) => {
    return request.post(`${BASE_URL}/admin/repairSuggest/save`,params)
};

//删除治理建议库信息
export const suggestion_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/repairSuggest/deleteById/`+id)
};

//科研成果信息查询
export const scientific_table_search = (params) => {
    return request.post(`${BASE_URL}/admin/scientificPayoffs/listPage`,params)
};

//新增科研成果信息
export const scientific_newInfo_submit = (params) => {    
    return request.post(`${BASE_URL}/admin/scientificPayoffs/save`,params)
};

//编辑科研成果信息
export const scientific_editInfo = (params) => {
    return request.post(`${BASE_URL}/admin/scientificPayoffs/save`,params)
};

//删除科研成果信息
export const scientific_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/scientificPayoffs/deleteById/`+id)
};