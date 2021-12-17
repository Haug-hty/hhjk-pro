
// import request from 'request'
import request from '@/utils/request'

import { netAddress } from '../../global';  const BASE_URL = netAddress
//export const getsdkversion_api =()=> ajax(BASE_URL+'/api/sdkversion')
// export const reqAddress =(param)=> ajax('/position/${param}')

// export const getstocktypecode_post_api = params => { return request.post(`${BASE_URL}/api/stocktypecode/new`, params)};
// export const getstocktypecode_get_api =()=> ajax(BASE_URL+'api/stocktypecode')


// export const getTest = () =>{
//     alert(`${BASE_URL}/v1/bpi/currentprice.json`)
//     return request.get(`${BASE_URL}/v1/bpi/currentprice.json`)
// }

export const getTest = () => { return request.get(`${BASE_URL}/userLogin/login`)};