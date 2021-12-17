// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//对象方案信息列表查询
export const assessor_team_query = (params) => {
    return request.post(`${BASE_URL}/admin/team/listPage`, params)
}