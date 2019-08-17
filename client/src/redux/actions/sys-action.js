/**
  一些公共的action可以写在这里，比如用户登录、退出登录、权限查询等
  其他的action可以按模块不同，创建不同的js文件
**/

// import Fetchapi from '../util/fetch-api';   // 自己写的工具函数，封装了请求数据的通用接口
import { message } from 'antd';

import {request} from '../../utils/httpUtil'

import {LOGOUT} from '../constants'



// /**
//  * 登录
//  * @params: { username, password }
//  * **/
export const onLogin = (params = {}) => async(dispatch) => {

    try {
        const res = await request('post', 'auth/login', params)

            if(res.code==2000){
                localStorage.setItem("userLoginInfo",JSON.stringify(res.data));
                message.success("登录成功");

            }
            return res;
      } catch(err) {
            return res;
              message.error('网络错误，请重试');
    }
};

/**
 * 退出登录
 * @params: null
 * **/
export const onLogout = (params = {}) => async(dispatch) => {
    try {
        await dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        // sessionStorage.removeItem('userinfo');
        
        localStorage.removeItem('userLoginInfo');

        return 'success';
    } catch(err) {
        message.error('网络错误，请重试');
    }
};

/**
 * 设置用户信息
 * @params: userinfo
 * **/
export const setUserInfo = (userinfo = {}) => async(dispatch) => {
    try {

        await dispatch({
            type: 'SETUSERINFO',
            userinfo,
        });
    } catch(err) {
            message.error('失败');
    }
};
