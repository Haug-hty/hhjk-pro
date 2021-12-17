// import request from 'request'
import request from '@/utils/request'
import qs from 'qs'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//可选指标内容信息
export const target_GuidelineId_choose = (id) => {
    return request.post(`${BASE_URL}/admin/assessSchemeGt/findByAssessSchemeId/`+id)
};

//可选指标内容提交
export const target_save_batch = (param) => {
    return request.post(`${BASE_URL}/admin/assessSchemeGt/saveBatch`,param)
};