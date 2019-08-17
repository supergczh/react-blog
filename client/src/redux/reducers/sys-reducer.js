/** 通用reducer **/
import {SETUSERINFO} from '../constants'

const initState = {
    userinfo: null, // 当前用户基本信息
    menus: [],      // 当前用户所有已授权的菜单判断
  };

  
  const actDefault = (state) => state;
  
  const onLogout = (state,  payload) => {
    return Object.assign({}, state, {
        userinfo: null,
        menus: [],
    });
  }; 
  
  const setUserInfo = (state, payload ) => {
    return Object.assign({}, state, {
        userinfo: payload,
    });
  };
  
  const reducerFn = (state = initState, action) => {
    switch (action.type) {
    case 'APP.onLogout':  // 退出登录，清除用户信息
      return onLogout(state, action);
    case SETUSERINFO: // 设置用户信息，登录成功时、同步sessionStorage中的用户信息时 触发
  
      return setUserInfo(state, action.userinfo);
    default:
      return actDefault(state, action);
    }
  };
  
  export default reducerFn;
  