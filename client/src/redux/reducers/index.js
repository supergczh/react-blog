import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

// ============================================
// Import app reducers
import reducerFn from "./sys-reducer";
// ============================================
// Combine
const rootReducer = combineReducers({
  // 其他自定义的reducer
  reducerFn:reducerFn,
});

export default rootReducer;
