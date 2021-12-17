
import request from '@/utils/request'
import axios from 'axios';
import { getToken } from '@/utils/auth'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//获取模版文件地址
export const get_target_template = params => {
    return request.post(`${BASE_URL}/admin/template/listPage`, params)
}



//数据类型模板上传
export const template_data_submit = (params) => {
    console.log(params)
    return request({
        method: 'post',
        url: `${BASE_URL}/admin/assessSchemeData/importDataFromExcel`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data',            
        }

    })
};


//下载模版数据
export const exls_template_down = params => {
    return axios({
        method: 'get',
        url: `${BASE_URL}/admin/template/downloadTemplate?assessSchemeId=` + params.assessSchemeId + `&relationFun=` + params.relationFun,
        responseType: 'blob',    // 必须加上
        headers: {
            'Content-Type': 'multipart/x-www-form-urlencoded',
            'PRIVATE-TOKEN': getToken()
        }
    })
}
