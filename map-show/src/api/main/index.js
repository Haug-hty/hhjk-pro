import request from '@/utils/request'
import { log } from 'util';
import { netAddress } from '../../global';  const BASE_URL = netAddress

/** 获取对象地理位置信息数据 */
export const rlCom_data = () => {
    return request.post(`${BASE_URL}/admin/wj/all`)
};

/** 获取指标项数据 */
export const target_info = (id) => {
    return request.get(`${BASE_URL}/admin/wj/findTargetDetailById/`+id)
};

/** 获取Token */
export const getToken = (token) => {
    return request.get(`${BASE_URL}/admin/wj/tokenAuthorize/`+token)
}

