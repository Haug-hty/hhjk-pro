import request from '@/utils/request'
import qs from 'qs'
// web项目打包部署使用
const BASE_URL = '/api'
// 手机app项目，apk安装包使用
// const BASE_URL ='http://1.13.9.113:7002/hhjk' 


//对象方案信息列表查询
export const schemeList = (params) => {
    return request.post(`${BASE_URL}/admin/assessScheme/listPage`, params)
}


//对象方案信息列表查询
export const schemeListPic = (params) => {
    return request.post(`${BASE_URL}/admin/assessScheme/findWorkByUserId`, params)
}

//根据方案对应指标体系和对象类型，查询需要上传图片的指标详情，例如：岸坡稳定性-水土流失-轻度
export const target_score_detile = params =>{
    return request.post(`${BASE_URL}/admin/guidelinesTargetScoreSence/findByGuidelinesIdAndRlType`,params)
}

//根据方案查询对应对象制定过程中的河段信息
export const reach_info_list = id =>{
    return request.get(`${BASE_URL}/admin/assessSchemeReach/findReachByAssessId/` + id)
}


//移动端/pc端,上传图片,现场工作证据,提供给报告编写的时候使用
export const pic_zj_submit = params =>{
    return request.post(`${BASE_URL}/admin/assessSchemeDataFile/submitForWork`,params)
}



//移动端/pc端,上传图片,现场工作证据,提供给报告编写的时候使用
export const pic_data_submit = params =>{
    return request.post(`${BASE_URL}/admin/assessSchemeDataFile/submitForGather`,params)
}

// 文件上传功能实现
export const uploadFileRequest = (fileData) => {
    return request({
        method: 'post',
        url: `${BASE_URL}/admin/main/upload`,
        data: fileData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// 获取简报数据
export const get_briefing_data = (id) => {
    return request.get(`${BASE_URL}/admin/assessScheme/createBriefReport/`+id)
}

//通过方案id查找需要填写的评估数据
export const scheme_data_serach = (params) => {
    return request.post(`${BASE_URL}/admin/assessSchemeData/findByAssessId`, params)
}

/** 通过id获取scheme信息 */
export const schemeInfoquery = (id) => {
    return request.get(`${BASE_URL}/admin/assessScheme/findById/`+id)
}

/** 通过id获取scheme图片信息 */
export const schemePicInfo = (param) => {
    return request.post(`${BASE_URL}/admin/assessSchemeDataFile/findByCondition`, param)
}


/** 通过schemeid获取评价总分 */
export const schemeTotalScoreTable = (param) => {
    return request.post(`${BASE_URL}/admin/assessScheme/doOverallEvaluateOnlyTarget`, qs.stringify(param))
}

/** 获取当前用户信息 */ 
export const getUserProfile = () => {
    return request.get(`${BASE_URL}/admin/user/findCurrentUserInfo` )
};

//推出登录
export const loginOut = () => {
    return request.get(`${BASE_URL}/admin/logout`)
}

//获取用户机构列表
export const getOrgList = () => {
    return request.get(`${BASE_URL}/admin/user/orgListInfo`)
}


//更换机构
export const changeOrg = (id) => {
    return request.get(`${BASE_URL}/admin/user/changeOrg/`+ id)
}


// 删除照片
export const delPic = (id) => {
    return request.get(`${BASE_URL}/admin/assessSchemeDataFile/deleteById/` + id)
}