
const baseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000';
        // return 'http://saasapidemo.jiadd.cn';
    }else{
        return 'https://mblog.zhanghuigcgj.com';
    }

   
}
export const IP = baseUrl(); 
