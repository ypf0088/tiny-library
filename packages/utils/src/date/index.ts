/*
 * @Author: ryyyyy
 * @Date: 2021-03-30 15:19:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 11:58:52
 * @Description: Do not edit
 * @FilePath: /packages/utils/src/date/index.ts
 */

import { isDate, isNumber, isString } from '@tiny/shared';

/**
 * @description: 常量部分
 */
const daySeconds = 24 * 60 * 60 * 1000; //一天的毫秒数
const defaultDateFormat = 'yyyy/MM/dd'; //默认的日期格式
const allFormatDate = {
    //用到的日期格式
    year: 'yyyy',
    'short-year': 'yy',
    month: 'MM',
    day: 'dd',
    hour: 'hh',
    minute: 'mm',
    second: 'ss',
};

type DateTime = {
    date: Date;
    year: number;
    month: number;
    day: number;
    week: number;
    hour: number;
    minute: number;
    second: number;
};

/**
 * @description: 将传入的不规则时间转化为Date形式，字符串统一按：yyyy-MM-dd 形式处理
 * @param {*} date : Date || String
 * @return {*} Date
 */
function getRealDate(date: unknown): Date {
    let tempDate = date;
    if (!isDate(tempDate)) {
        if (isString(tempDate)) {
            tempDate = new Date(tempDate);
        } else {
            tempDate = new Date();
        }
    }
    return tempDate as Date;
}

/**
 * @function 个位数补0：zeroFill
 * @param Number: n
 * @returns String:  01||11
 */
function zeroFill(n: number | undefined): string {
    n = Number(n);
    return n < 10 ? '0' + n : n.toString();
}
/**
 * @description: 检测各种时间格式是否符合规格
 * @param {*} num: Number || String
 * @param {*} type: String
 * @return {*} Number(符合规格的情况下返回格式之后的数字) || Boolean(不符合规格返回false)
 */
function isDateRegular(num: number | string, type: string): string | false {
    num = isString(num) ? parseInt(num) : num;
    switch (type) {
        case 'month':
            return num >= 1 && num <= 12 ? zeroFill(num) : false;
        case 'day':
            return num >= 1 && num <= 31 ? zeroFill(num) : false;
        case 'hour':
            return num >= 0 && num <= 23 ? zeroFill(num) : false;
        case 'minute':
            return num >= 0 && num <= 59 ? zeroFill(num) : false;
        case 'second':
            return num >= 0 && num <= 59 ? zeroFill(num) : false;
        case 'week':
            return num >= 1 && num <= 7 ? zeroFill(num) : false;
        default:
            return false;
    }
}
/**
 * @description: 格式化时间形式
 * @param {*} date: object
 * @param {*} isShow: booleab
 * @return {*} string: 格式解释如下
 * '年：yyyy(2021: 2021年) yy(21: 21年，取年分后俩位数)
 * 月：MM(03：3月)
 * 日：dd(03: 3日)
 * 时：hh(01: 早上1点，22: 晚上10点)'
 * 分：mm(02: 2分)
 * 秒：ss(32: 32秒)
 * 注：为了让月month和分钟minute分开，分别用了大小写
 */
function getFormatteredDate(date: DateTime | null, format?: string): string {
    const { year, month, day, hour, minute, second } = date || {};
    if (!isString(format)) {
        format = defaultDateFormat;
    }
    let reg = /(yy?yy?|MM?|dd?|hh?|mm?|ss?)/g;
    return format.replace(reg, function (m): string {
        switch (m) {
            case allFormatDate.year:
                return zeroFill(year);
            case allFormatDate['short-year']:
                return zeroFill(year).slice(-2);
            case allFormatDate.month:
                return zeroFill(month);
            case allFormatDate.day:
                return zeroFill(day);
            case allFormatDate.hour:
                return zeroFill(hour);
            case allFormatDate.minute:
                return zeroFill(minute);
            case allFormatDate.second:
                return zeroFill(second);
            default:
                return '';
        }
    });
}

/**
 * @description: 获取解析后的时间对象
 * @param {*} date
 * @param {*} format: String 不传则以默认的格式‘yyyy-MM-dd’去解析
 * @return {*} Object: {date: Date, year, month, day, week, hour, minute, second}
 */
//提供给getParsedDate用于解析字符串的函数
function parseFormatedDateStr(dateStr: string, format: string) {
    //去除首尾空格
    let spaceReg = /(^\s*)|(\s*$)/g;
    dateStr = dateStr.replace(spaceReg, '');
    format = format.replace(spaceReg, '');
    //去除首尾空格后若长度不一样，不需要比较
    if (dateStr.length !== format.length) {
        console.warn('输入的格式与时间字符不匹配，默认转为当天的时间');
        return +new Date();
    }

    let validDateReg;
    switch (format) {
        case defaultDateFormat:
            validDateReg = /[0-9]{4}(\/|\-)[0-9]{2}(\/|\-)[0-9]{2}/g;
            break;
        case 'yyyy/MM/dd hh:mm':
            validDateReg =
                /[0-9]{4}(\/|\-)[0-9]{2}(\/|\-)[0-9]{2} [0-9]{2}:[0-9]{2}/g;
            break;
        case 'yyyy/MM/dd hh':
            validDateReg = /[0-9]{4}(\/|\-)[0-9]{2}(\/|\-)[0-9]{2} [0-9]{2}/g;
            break;
        default:
            validDateReg =
                /[0-9]{4}(\/|\-)[0-9]{2}(\/|\-)[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/g;
    }
    if (validDateReg.test(dateStr)) {
        if (dateStr.length === 13) {
            dateStr += ':00'; // new Date()不识别2010-09-09 10
        }
        return dateStr;
    }
    let reg = /([0-9]{2,4})/g;
    let year,
        month,
        day,
        hour,
        minute,
        second,
        temp,
        result = '';
    while ((temp = reg.exec(dateStr))) {
        let index = temp.index,
            str = temp[0],
            m = format.slice(index, index + str.length);
        switch (m) {
            case allFormatDate.year:
                year = str;
                break;
            case allFormatDate.month:
                month = isDateRegular(str, 'month');
                break;
            case allFormatDate.day:
                day = isDateRegular(str, 'day');
                break;
            case allFormatDate.hour:
                hour = isDateRegular(str, 'hour');
                break;
            case allFormatDate.minute:
                minute = isDateRegular(str, 'minute');
                break;
            case allFormatDate.second:
                second = isDateRegular(str, 'second');
                break;
            default:
                console.warn('输入的格式与时间字符不匹配，默认转为当天的时间');
                return +new Date();
        }
    }
    if (year && month && day) {
        result += `${year}/${month}/${day} `;
    } else {
        console.warn('输入的格式与时间字符不匹配，默认转为当天的时间');
        return +new Date();
    }
    if (hour && minute && second) {
        result += `${hour}:${minute}:${second}`;
    }
    return result;
}
function getParsedDate(date: unknown, format?: string): DateTime {
    let tempDate = date;
    if (!isString(format)) {
        format = defaultDateFormat;
    }
    if (isString(tempDate)) {
        let formateredStr = parseFormatedDateStr(tempDate, format);
        tempDate = new Date(formateredStr);
    }
    if (isNumber(tempDate)) {
        tempDate = new Date(tempDate);
    }
    if (!isDate(tempDate)) {
        tempDate = new Date();
    }
    return {
        date: tempDate as Date,
        year: (tempDate as Date).getFullYear(),
        month: (tempDate as Date).getMonth() + 1,
        day: (tempDate as Date).getDate(),
        week:
            (tempDate as Date).getDay() === 0 ? 7 : (tempDate as Date).getDay(),
        hour: (tempDate as Date).getHours(),
        minute: (tempDate as Date).getMinutes(),
        second: (tempDate as Date).getSeconds(),
    };
}
/**
 * @description: 获取当前的时间
 * @param {*}
 * @return {*} string: '2021-03-05 23:34:59'
 */
function getTimeNow() {
    var date = new Date();
    return getFormatteredDate(getParsedDate(date), defaultDateFormat);
}

/**
 * @description: 获取今天的时间
 * @return {*} Object：跟getParsedDate返回值一样
 */
function getToday() {
    var date = new Date();
    return getParsedDate(date);
}

/**
 * @description: 获取从给定日期开始，偏移指定天数的时间
 * @param {*} offsetNum : number || string
 * @param {*} startDate : string(2021-03-05) || date
 * @return {*} Object：跟getParsedDate返回值一样
 */
function getOffsetDate(offsetNum: string | number, startDate?: string | Date) {
    offsetNum = isString(offsetNum) ? parseInt(offsetNum) : offsetNum;
    if (!isNumber(offsetNum)) {
        offsetNum = 0;
    }
    let start = getRealDate(startDate);
    return getParsedDate(new Date(+start + offsetNum * daySeconds));
}

/**
 * @description: 获取从给定月份开始，偏移月份的时间
 * @param {*} offsetNum : number || string
 * @param {*} year : number
 * @param {*} month : number
 * @return {*} object: {year, month}
 */
function getOffsetMonth(
    offsetNum: string | number,
    year: number,
    month: number,
) {
    offsetNum = isString(offsetNum) ? parseInt(offsetNum) : offsetNum;
    if (!isNumber(offsetNum)) {
        offsetNum = 0;
    }
    if (!year && !month) {
        year = new Date().getFullYear();
        month = new Date().getMonth() + 1;
    }
    month += offsetNum;
    let counts = 0;
    if (Math.abs(month) > 12) {
        //~~去除小数部分
        counts = ~~(month / 12);
    }
    if (month <= 0) counts--;
    year += counts;
    month %= 12;
    month = month === 0 ? 12 : month;

    return {
        year,
        month,
    };
}

/**
 * @description: 获取偏给定年偏移的年份
 * @param {*} offsetYear : number
 * @param {*} year : number || string
 * @return {*} object : {year}
 */
function getOffsetYear(
    offsetYear: string | number,
    year?: number | string,
): number {
    offsetYear = isString(offsetYear) ? parseInt(offsetYear) : offsetYear;
    if (!isNumber(offsetYear)) {
        offsetYear = 0;
    }
    year = isString(year) ? parseInt(year) : year;
    if (!isNumber(year)) {
        year = new Date().getFullYear();
    }
    year += offsetYear;
    return year;
}

/**
 * @description: 获取给定年月的第一天和最后一天
 * @param {*} year : number
 * @param {*} month : number
 * @return {*} Object: {start, end} 内部对象形式均同getParsedDate返回值
 */
function getSomeMonthStartEnd(year: number, month: number) {
    if (!year && !month) {
        year = new Date().getFullYear();
        month = new Date().getMonth() + 1;
    }
    let startDate = new Date(year, month - 1, 1),
        endDate = new Date(year, month, 0);
    return {
        start: getParsedDate(startDate),
        end: getParsedDate(endDate),
    };
}

/**
 * @description: 获取某年某月的总天数
 * @param {*} year : number
 * @param {*} month : numer
 * @return {*}
 */
function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

/**
 * @description: 判断否是闰年
 * @param {*} year
 * @return {*} Boolean
 */
function isLeapYear(year: string | number): boolean {
    year = isString(year) ? parseInt(year) : year;
    if (!isNumber(year)) {
        year = new Date().getFullYear();
    }
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * @description: 比较两个日期大小
 * @param {*} startDate
 * @param {*} endDate
 * @return {*} -1: start > end; 0: start == end; 1: start < end
 */
function compare(startDate: unknown, endDate: unknown): number {
    let start = getRealDate(startDate),
        end = getRealDate(endDate);
    return end > start ? 1 : end < start ? -1 : 0;
}

export {
    isDateRegular,
    getFormatteredDate,
    getParsedDate,
    getTimeNow,
    getToday,
    getOffsetDate,
    getOffsetMonth,
    getOffsetYear,
    getSomeMonthStartEnd,
    getDaysInMonth,
    isLeapYear,
    compare,
    zeroFill,
};
