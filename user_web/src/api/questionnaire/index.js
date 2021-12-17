import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//调查问卷获取
export const getQuestionnaire = (token) => {
    return request.get(`${BASE_URL}/admin/questionnaire/getXml/` + token)
};

// 获取调查问卷数据列表

export const questionnaire_list = (params) => {
    return request.post(`${BASE_URL}/admin/questionnaire/listPage`,params)
};


// 获取问卷详情数据

export const questionnaire_detile_get = (params) => {
    return request.post(`${BASE_URL}/admin/questionnaire/detail`,params)
};

// 判定问卷无效

export const nopass = (params) => {
    return request.post(`${BASE_URL}/admin/questionnaire/noPass`,params)
};

// 问卷统计

export const statisticsQuestionnaire = (params) => {
    return request.post(`${BASE_URL}/admin/questionnaire/statistics`,params)
};