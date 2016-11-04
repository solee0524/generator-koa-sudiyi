/**
 * constant infos
 */
var CONSTANTS = {};

// response
CONSTANTS['RESPONSE'] = {};
CONSTANTS['RESPONSE']['SUCCESS'] = {code: 0, message: 'success', display: null};
CONSTANTS['RESPONSE']['ERRORS'] = {};
CONSTANTS['RESPONSE']['ERRORS']['E400'] = {code: 400, message: '参数错误', display: '参数错误'};
CONSTANTS['RESPONSE']['ERRORS']['E401'] = {code: 401, message: '未登录', display: '未登录'};
CONSTANTS['RESPONSE']['ERRORS']['E404'] = {code: 404, message: '未找到您要的实体', display: '未找到您要的实体'};
CONSTANTS['RESPONSE']['ERRORS']['E409'] = {code: 409, message: '重复创建', display: '重复创建'};
CONSTANTS['RESPONSE']['ERRORS']['E500'] = {code: 500, message: '服务器内部错误', display: '服务器繁忙，请稍后再试'};

// exports
module.exports = CONSTANTS;
