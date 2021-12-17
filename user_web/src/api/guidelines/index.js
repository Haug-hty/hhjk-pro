import axios from 'axios'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//标准列表信息查询
export const guidelines_table_search = (params) => {
    return request.post(`${BASE_URL}/admin/guidelines/listPage`,params)
};

//通过ID查找
export const guidelines_info_findById = (id) => {
    return request.get(`${BASE_URL}/admin/guidelines/findById/`+ id)
};

//指标层信息查询（初始化/条件查询）
export const target_tableList_search= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/listPage`,params)
};

//通过名称左右模糊匹配
export const guidelines_otions_select = (name) => {
    return request.get(`${BASE_URL}/admin/guidelines/autoComplete/` + name)
};


//通过通过父ID查找
export const target_byGuidelineId = (id,all) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/findByGuidelinesId/` +id+'?all='+all)
};

//指标综合评价分级标准查询
export const overall_tableList_search= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesOverall/listPage`,params)
};

//指标体系树文档行格式查询（根据目标层id）
export const search_tree_type_guidelinesTarget= (id) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/guidelinesTargetByTree/` + id)
};

//指标体系列表文档行格式查询（根据目标层id）
export const search_list_type_guidelinesTarget= (id) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/findWholeInfo/` + id)
};

//新增指标内容信息
export const target_newInfo_submit = (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/save`,params)
};

//删除指标内容信息
export const target_info_del = (id) => {
    return request.get(`${BASE_URL}/admin/guidelinesTarget/deleteById/`+id)
};


