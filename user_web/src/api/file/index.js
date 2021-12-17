import axios from 'axios'
import request from '@/utils/request'
import { netAddress } from '../../global';  const BASE_URL = netAddress

//文件上传方法
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

/** 获取文件方法 */
export const getFileByCode = (code) => {
    return request.get(`${BASE_URL}/admin/uploadFile/getUrl/`+ code)
}