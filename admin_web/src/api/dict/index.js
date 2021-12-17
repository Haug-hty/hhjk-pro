// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global'; 
const BASE_URL = netAddress

//字典信息域查询
export const dict_search_domain = (domain) => {
    return request.get(`${BASE_URL}/admin/common/findByDomain/` + domain)
};


