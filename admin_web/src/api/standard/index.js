// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';
const BASE_URL = netAddress

//标准列表信息查询
export const guidelines_table_search = (params) => {
    return request.post(`${BASE_URL}/admin/guidelines/listPage`,params)
};

//新增标准信息
export const guidelines_newInfo_submit = (params) => {
    return request.post(`${BASE_URL}/admin/guidelines/save`,params)
};

//编辑标准信息
export const guidelines_edit = (params) => {
    return request.post(`${BASE_URL}/admin/guidelines/save`, params)
};

//删除标准信息
export const guidelines_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/guidelines/deleteById/` + id)
};

//通过名称左右模糊匹配
export const guidelines_otions_select = (name) => {
    return request.get(`${BASE_URL}/admin/guidelines/autoComplete/` + name)
};


//通过通过父ID查找
export const target_byGuidelineId = (id,all) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/findByGuidelinesId/` +id+'?all='+all)
};


//新增指标内容信息
export const target_newInfo_submit = (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/save`,params)
};

//指标层信息查询（初始化/条件查询）
export const target_tableList_search= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/listPage`,params)
};

//删除指标层信息
export const target_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/guidelinesTarget/deleteById/` + id)
};


//指标综合评价分级标准查询
export const overall_tableList_search= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesOverall/listPage`,params)
};

//指标综合评价分级标准保存
export const overall_addInfo= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesOverall/save`,params)
};

//指标综合评价分级标准删除
export const overall_delInfo= (id) => {
    return request.get(`${BASE_URL}/admin/guidelinesOverall/deleteById/`+id)
};

//指标赋分方法保存
export const target_score_save= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTargetScore/save`,params)
};


//指标赋分内容查询（根据targetId）
export const target_score_targetId_query= (id) => {
    return request.get(`${BASE_URL}/admin/guidelinesTargetScore/findByGuidelinesTargetId/` + id)
};


//指标赋分内容查询
export const target_score_tableList_search= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTargetScore/listPage` , params)
};


//现场勘看指标详细分项内容提交
export const target_score_sence_add= (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTargetScoreSence/addBatch` , params)
};


//现场勘看指标详细分项内容提交
export const import_data_submit= (guidelinesId,rlType,form) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/uploadExec?guidelinesId=`+guidelinesId + `&rlType=` + rlType , form)
};

//指标体系树文档行格式查询（根据目标层id）
export const search_tree_type_guidelinesTarget= (id) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/guidelinesTargetByTree/` + id)
};

//指标体系列表文档行格式查询（根据目标层id）
export const search_list_type_guidelinesTarget= (id) => {
    return request.post(`${BASE_URL}/admin/guidelinesTarget/findWholeInfo/` + id)
};

//删除指标内容信息
export const target_info_del = (id) => {
    return request.get(`${BASE_URL}/admin/guidelinesTarget/deleteById/`+id)
};


//删除指标内容信息
export const target_score_sence_targetId_query = (params) => {
    return request.post(`${BASE_URL}/admin/guidelinesTargetScoreSence/findByCondition`,params)
};


//删除指标内容信息
export const xmlSubmit = (params) => {
    return request({
        method: 'post',
        url: `${BASE_URL}/admin/guidelines/questionnaireInit`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }

    })
};

  
// 获取指标target单独信息
export const getTargetInfo = (id) => {
    return request.get(`${BASE_URL}/admin/guidelinesTarget/findById/`+id)
};