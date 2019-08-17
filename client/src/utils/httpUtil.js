import axios from 'axios';
import {IP} from '../config/config.js';
import tools  from './util.js';
// import {encrypt_datas} from './dev.check_common.js';
import { message } from 'antd';
// import '../check/check_common.mini'

// 创建实例时设置配置的默认值
const instance = axios.create({
    baseURL: IP
});


/**
 * 公用请求
 *
 * @export
 * @param {string} type 请求方式
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @returns
 */
export function request(type, url, params) {

//    params.timeStarmp = tools.timeStarmp();
  
   let config,token;


   if(JSON.parse(localStorage.getItem("userLoginInfo"))){
       token= JSON.parse(localStorage.getItem("userLoginInfo")).token;
   }

   if(token){
       params.token=token;
       config = { url: url, method: type, params };
   }else{
       config = { url: url, method: type, params};
   }
  
   
    
    return new Promise(function (resolve, reject) {
        instance.request(config)
            .then((response) => {
                
               if(response.data.code==2000){
                  resolve(response.data);
               }else if(response.data.code==2006){
                   localStorage.removeItem("userLoginInfo")
                   message.error(response.data.msg);
                   window.location.replace('/login');
               }
               else{
                  resolve(response.data);
                //   message.error(response.data.msg);
               }
                
            })
            .catch((err) => { 
                reject(err);
                message.error(err);
            });
    })

}

/**
* 列表请求 同时请求列表
* @param {string} condition['tableHeadUrl'] 表头数据
* @param {string} condition['tableBodyUrl'] 列表数据
**/
export function requestAll(condition) {

    return new Promise(function (resolve, reject) {
        axios.all([
            instance.get(condition['tableHeadUrl'],
                { params: condition['tableHeadParams'] }),
            instance.get(condition['tableBodyUrl'],
                { params: condition['tableBodyParams'] })
        ])
        .then(axios.spread(function (headData, bodyData) {
            resolve({ headData: headData, bodyData: bodyData });
        }))
        .catch((err) => {
            reject(err);
        });
    })

}
