/** 这个文件中封装了一些常用的工具函数 **/

const tools = {
    /**
    * 保留N位小数
    * 最终返回的是字符串
    * 若转换失败，返回参数原值
    * @params
    *   str - 数字或字符串
    *   x   - 保留几位小数点
    */
    pointX(str, x = 0) {
      if (!str && str !== 0) {
        return str;
      }
      const temp = Number(str);
      if (temp === 0) {
        return temp.toFixed(x);
      }
      return temp ? temp.toFixed(x) : str;
    },

    /**
    * 去掉字符串两端空格
    **/
    trim(str) {
      const reg = /^\s*|\s*$/g;
      return str.replace(reg, "");
    },

    /**
    * 给字符串打马赛克
    * 如：将123456转换为1****6，最多将字符串中间6个字符变成*
    * 如果字符串长度小于等于2，将不会有效果
    **/
    addMosaic(str) {
      const s = String(str);
      const lenth = s.length;
      const howmuch = (() => {
        if (s.length <= 2) {
          return s.length;
        }
        const l = s.length - 2;
        if (l <= 6) {
          return l;
        }
        return 6;
      })();
      const start = Math.floor((lenth - howmuch) / 2);
      const ret = s.split("").map((v, i) => {
        if (i >= start && i < start + howmuch) {
          return "*";
        }
        return v;
      });
      return ret.join("");
    },
    /**
     * 验证字符串
     * 只能为字母、数字、下划线
     * 可以为空
     * **/
    checkStr(str) {
      if (str === "") {
        return true;
      }
      const rex = /^[_a-zA-Z0-9]+$/;
      return rex.test(str);
    },
    /**
     * 验证字符串
     * 只能为数字
     * 可以为空
    **/
    checkNumber(str) {
      if (!str) {
        return true;
      }
      const rex = /^\d*$/;
      return rex.test(str);
    },
    /** 正则 手机号验证 **/
    checkPhone(str) {
      const rex = /^1[34578]\d{9}$/;
      return rex.test(str);
    },

    /**
    * 正则
    * 邮箱验证
    */
    checkEmail(str) {
      const rex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return rex.test(str);
    },
    /**
    * 字符串加密
    * 简单的加密方法
    */
    compile(code) {
      let c = String.fromCharCode(code.charCodeAt(0) + code.length);
      for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
      }
      return c;
    },

    /**
     * 字符串解谜
     * 对应上面的字符串加密方法
    */
    uncompile(code) {
      let c = String.fromCharCode(code.charCodeAt(0) - code.length);
      for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    },

    /**
     * 生成时间戳精确到毫秒
    **/
    timeStarmp() {
      return new Date().getTime();
    },

    /**
     * 清除一个对象中那些属性为空值的属性
     * 0 算有效值
    **/
    clearNull(obj) {
      const temp = {};
      Object.keys(obj).forEach(item => {
        if (obj[item] === 0 || !!obj[item]) {
          temp[item] = obj[item];
        }
      });
      return temp;
    }
  };

  export default tools;

  /*
 * @作者: jiawei 
 * @创建时间: 2018-06-11 17:42:21 
 * @文件主题: 工具
 *
 */

import { message } from 'antd';
message.config({
    top: 150
});

// 判断接口返回数据是否正确
export const utilReqestProcess = (response, callback, flag) => {
    if (response.status === 200) {

        if (response.data.code === 400) {

            if (flag) {
                callback && callback();
            } else {
                response.data.message ? message.error(response.data.message) : message.error('数据获取失败');
            }
        } else if (response.data.code === 401) {
            window.location.replace('#/login');
            window.localStorage.removeItem("userInfo");
        } else {
            callback && callback();
        }
    } else {
        console.log('接口返回错误！');
    }
}

// 整合filter的二级数据
export const filterListDataMerge = (filterData) => {
    return (name, response) => {
        filterData = deepCopy(filterData);
        if (name) {
            for (let i of filterData) {
                if (i.name === name) {
                    i.data = response.data;
                    return filterData;
                }
            }
        } else {
            return filterData
        }
    }
}

// 整合编辑的二级数据
export const editListDataMerge = (filterData) => {
    return (name, response) => {
        if (name) {
            for (let i of filterData) {
                for (let j of i.data) {
                    if (j.name === name) {
                        j.data = response.data;
                        return filterData;
                    }
                }
            }
        } else {
            return filterData
        }
    }
}

/**
* 生成分页参数
* 
* @param {number} total 数据总条数，默认0 
* @param {number} current 当前页，默认1
* @param {number} pageSize 每页条数，默认25
* @param {function} change 页码以及pageSize 变化的回调，默认console
* @returns 返回分页的配置参数
*/
export const renderPagination = function (
    {
        total = 0,
        current = 1,
        pageSize = 20,
        change = function (current, pageSize) {
            console.log(current, pageSize)
        }
    } = {}
) {
    return {
        total: total,  // 数据总数
        showTotal: (totalSize) => `共 ${totalSize} 条数据`,
        showSizeChanger: true,
        current: current,　// 当前页
        pageSize: pageSize,  // 一页数据条数
        pageSizeOptions: ['10', '20', '50', '100'],
        defaultPageSize: 20,
        // 每页数据条数改变时
        onShowSizeChange(current, pageSize) {
            change(current, pageSize);
        },
        // 页码改变时
        onChange(current, pageSize) {
            change(current, pageSize);
        }
    }
}


Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


/**
 *校验身份证号
 *
 * @export
 * @param {*} no
 * @returns
 */
export function verifyIdCardNo(rule, no, callback) {
    if (!no) { callback && callback('请填写身份证号'); return; }
    // 校验长度
    if (no.length !== 15 && no.length !== 18) {
        callback && callback('身份证号长度错误');
        return false;
    }
    // 校验地区码
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    if (!city[no.substr(0, 2)]) {
        callback && callback('身份证地址编码错误');
        return false;
    }
    // 检验生日
    let birth = '';
    if (no.length === 15) {
        let year = no.substring(6, 8);
        if (year > '14') {
            year = '19' + year;
        } else {
            year = '20' + year;
        }
        let month = no.substring(8, 10);
        let day = no.substring(10, 12);
        birth = year + '-' + month + '-' + day;
    }
    if (no.length === 18) {
        let year = no.substring(6, 10);
        let month = no.substring(10, 12);
        let day = no.substring(12, 14);
        birth = year + '-' + month + '-' + day;
    }
    const reg = /^([1-2]\d{3})[/|-](0?[1-9]|10|11|12)[/|-]([1-2]?[0-9]|0[1-9]|30|31)$/ig;
    if (!(reg.test(birth))) {
        callback && callback('身份证号出生日期错误');
        return false;
    }
    callback && callback();
    return true;
}


/**
 *  提取身份证号中的 出生日期 以及性别
 *
 * @export
 * @param {*} no 校验过后的身份证号码
 * @returns {
 *              birth：出生日期
 *              sex： 性别 0 是女的， 1 是男的
 *          }
 */
export function extractIdCardNoInfo(no) {
    let birth = '';
    let sex = 0;

    if (no.length === 15) {
        let year = no.substring(6, 8);
        if (year > '14') {
            year = '19' + year;
        } else {
            year = '20' + year;
        }
        let month = no.substring(8, 10);
        let day = no.substring(10, 12);
        birth = year + '-' + month + '-' + day;
        sex = no.substring(14, 15) % 2;
    }
    if (no.length === 18) {
        let year = no.substring(6, 10);
        let month = no.substring(10, 12);
        let day = no.substring(12, 14);
        birth = year + '-' + month + '-' + day;
        sex = no.substring(16, 17) % 2;
    }

    return {
        birth: birth,
        sex: sex // 0 是女的 1 是男的
    }
}

/**
 *
 *
 * @export 校验银行卡号
 * @param {*} rule
 * @param {*} bankAccount
 * @param {*} callback
 * @returns
 */
export function verifyBankAccount(rule, bankAccount, callback) {
    const pattern = /^([1-9]{1})(\d{14}|\d{15}|\d{18})$/,
        str = bankAccount.replace(/\s+/g, "");
    if (!pattern.test(str)) {
        callback && callback('请输入正确的银行卡号');
        return false;
    }
    callback && callback();
    return true;
}

// 校验手机号
export function verifyPhone(rule, bankAccount, callback) {
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

    if (!myreg.test(bankAccount)) {
        callback && callback('请输入正确的手机号');
        return false;
    }
    callback && callback();
    return true;
}

// 校验金额
export function verifyFloat(rule, bankAccount, callback) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!reg.test(bankAccount)) {
        callback && callback('请输入正确的数字，并保留小数点后两位小数');
        return false;
    }
    callback && callback();
    return true;
}

// 校验正整数
export function verifyInteger(rule, integer, callback) {
    const reg = /^[1-9]\d*$/;
    if (!reg.test(integer)) {
        callback && callback('请输入非0的整数');
        return false;
    }

    callback && callback();
    return true;
}


// 校验固定电话
export function verifyTelephone(rule, telephone, callback) {

    var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    var reg1 = /^\d{7,8}?$/;
    if (telephone) {
        if (!(reg.test(telephone) || reg1.test(telephone))) {
            callback && callback('固定电话格式不正确');
            return false;
        }
    }

    callback && callback();
    return true;
}

// getQueryString
export function getQueryString(search, name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;

}

//去左右空格
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 对数据深拷贝
export function deepCopy(data) {

    if (Object.prototype.toString.call(data) === '[object Array]') {
        return data.map(((item, i) => {
            if (Object.prototype.toString.call(item) === '[object Array]' || Object.prototype.toString.call(item) === '[object Object]') {
                return deepCopy(item);
            }
            return item;
        }));
    } else if (Object.prototype.toString.call(data) === '[object Object]') {
        let newData = {};
        for (let i in data) {
            if (Object.prototype.toString.call(data[i]) === '[object Array]' || Object.prototype.toString.call(data[i]) === '[object Object]') {
                newData[i] = deepCopy(data[i]);
            } else {
                newData[i] = data[i];
            }
        }

        return newData;
    }
}

// 导航栏数据扁平化
export function breadcrumb(menu) {
    let paths = [];
    menu = menu ? menu : [];
    menu.map((i) => {

        paths.push({
            path: `/${i['rule_key']}`,
            name: `${i['name']}`,
            openKeys: []
        });

        if (i['child']) {
            i['child'].map((item) => {
                paths.push({
                    path: `/${item['rule_key']}`,
                    name: `${item['name']}`,
                    openKeys: [i['rule_key']]
                });

                return item;
            })
        }

        return i;
    });

    return paths;
}

// 提取当前页面面包屑导航数据
export function extractBreadcrumb(paths, pagePath) {
    if (pagePath === 'home') {
        return [
            {
                path: `/home`,
                name: `首页`
            }
        ]
    } else {
        for (let i = 0; i < paths.length; i++) {
            if (paths[i]['path'] === '/' + pagePath) {
                return [
                    {
                        path: `/home`,
                        name: `首页`
                    },
                    {
                        path: `${paths[i]['path']}`,
                        name: `${paths[i]['name']}`,
                        openKeys: `${paths[i]['openKeys']}`,
                    }
                ];
            }
        }

        return [
            {
                path: `/home`,
                name: `首页`
            }
        ]
    }
}

// 提取当前路由地址 menu的打开和页面选中状态
export function selectMenuData(paths, pagePath) {
    for (let i = 0; i < paths.length; i++) {
        if (paths[i]['path'] === '/' + pagePath) {
            return {
                selectedKeys: [pagePath],
                openKeys: [`${paths[i]['openKeys']}`],
            };
        }
    }

    return {
        selectedKeys: ['home'],
        openKeys: [],
    }
}

// 生成时间戳精确到毫秒
export function timeStarmp() {
    return new Date().getTime();
}