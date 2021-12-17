// import request from 'request'
import request from '@/utils/request'
import qs from 'qs'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//方案基本信息保存
export const scheme_addInfo = (params) => {
    return request.post(`${BASE_URL}/admin/assessScheme/save`, params)
}

/** 评估方案工作阶段更新 */
export const schemeProcessState = (params) => {
    return request.post(`${BASE_URL}/admin/assessScheme/processState`, params)
}

//方案获取（通过id）
export const get_scheme_info = (id) => {
    return request.get(`${BASE_URL}/admin/assessScheme/findById/`+id)
}

//对象方案信息列表查询
export const scheme_tableList_query = (params) => {
    return request.post(`${BASE_URL}/admin/assessScheme/listPage`, params)
}

//对象方案信息编辑
export const rl_scheme_editInfo = (params) => {
    return request.post(`${BASE_URL}/admin/assessScheme/save`, params)
}

//方案检测点信息提交
export const scheme_site_info_submit = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeSite/save`, params)
}

//方案河段信息提交
export const scheme_reach_info_submit = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeReach/save`, params)
}

//方案检测点信息查询
export const scheme_site_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeSite/listPage`, params)
}

//方案河段信息查询
export const scheme_reach_info_query = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeReach/listPage`, params)
}

//通过方案id查找需要填写的评估数据
export const scheme_data_serach = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeData/findByAssessId`, params)
}

//通过ID或者函数编号获取指标基础数据编辑页面的属性和数据(填写过的或者函数内的参数list)
export const scheme_data_params = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeData/edit`, qs.stringify(params))
}

//运行方法包
export const scheme_data_computed = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeData/execAndSave`, params)
}

//运行方法包
export const scheme_data_computed_save = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeData/execAndSave`, params)
}


//删除方案
export const scheme_delInfo = (id) => {
    return request.get(`${BASE_URL}/admin/assessScheme/deleteById/` + id)
}

//根据方案查询对应对象制定过程中的河段信息
export const reach_info_list = id =>{
    return request.get(`${BASE_URL}/admin/assessSchemeReach/findReachByAssessId/` + id)
}


//运行方法包
export const scheme_data_score = (id) => {
    return request.post(`${BASE_URL}/admin/assessScheme/doOverallEvaluate?id=`+id)
}

//获取方案的照片库
export const schemePic = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeDataFile/findByCondition`,params)
}

//查看照片库之后删除无效照片
export const picDel = (id) => {
    return request.get(`${BASE_URL}/admin/assessSchemeDataFile/deleteById/`+id)
}


// 工作文件批量上传
export const workFileAddBatch = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeDataFile/addBatch`,params)
}


// 工作文件查询
export const getWorkFileList = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeDataFile/findByCondition`,params)
}


// 获取简报数据
export const get_briefing_data = (id) => {
    return request.get(`${BASE_URL}/admin/assessScheme/createBriefReport/`+id)
}