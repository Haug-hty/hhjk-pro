// import request from 'request'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

export const approval_report_submit = (params) =>{
    return request.post(`${BASE_URL}/admin/approvalReport/save`,params)
}


export const report_tableList_query = (params) =>{
    return request.post(`${BASE_URL}/admin/approvalReport/listPage`,params)
}


export const scientific_delInfo = (id) =>{
    return request.get(`${BASE_URL}/admin/approvalReport/deleteById/`+id)
}