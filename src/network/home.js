import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}
//需要请求类型和页码然后返回相应的数据
export function getHomeGoods(type,page) {
      return request({
        url:'/home/data',
        params:{
          type,
          page
        }
  })
}
