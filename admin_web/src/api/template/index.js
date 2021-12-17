// import request from 'request'
import request from '@/utils/request'
import qs from 'qs'
import { netAddress } from '../../global'; 
const BASE_URL = netAddress



//数据类型模板上传
export const data_template_add = (params) => {
    console.log(params)
    return request({
        method: 'post',
        url: `${BASE_URL}/admin/template/saveDataTemplate`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        
    })
};



//模板列表信息获取
export const template_list_search = (params) => {
    return request.post(`${BASE_URL}/admin/template/listPage`,params)
};


//工作模板信息新增
export const work_template_add = (params) => {
    return request.post(`${BASE_URL}/admin/template/saveWorkTemplate`,params)
};
