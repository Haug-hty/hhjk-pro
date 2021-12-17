
// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

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

