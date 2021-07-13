// @ts-nocheck

/* eslint-disable  */

/* eslint-disable camelcase */
// import { Device, Service } from 'miot';
import { fakeRequest } from "./testdata";

/** 将时间戳格式转化为month/day格式 */
const formatDateToMonthDay = timestamp => {
  const date = new Date(timestamp);
  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};
/** 将时间戳格式转化为x月格式 */


const formatDateToMonth = timestamp => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}月`;
};
/** 类型映射关系 */


const typeFormatMapping = {
  day: formatDateToMonthDay,
  week: formatDateToMonthDay,
  month: formatDateToMonth
};

const _parseStatisticsData = (response, format) => response.map(({
  value,
  time
}) => {
  // 需要这一步吗？？？？？？？？？？？？？
  const newValue = String(value).replace(/(\[|\])/g, '');
  const values = newValue.split(',').map(v => parseFloat(v).toFixed(2));
  return {
    value: values[0],
    timestamp: parseInt(`${time}`, 10),
    formatTime: format(time * 1000)
  };
});

const getUserStatisticsByDataType = async ({
  type,
  params
}) => {
  const time_end_msec = new Date().getTime();
  const time_end = parseInt(`${time_end_msec / 1000}`, 10);
  const newParams = {
    did: '2209',
    // Device.deviceID, // 必须是string类型 '2209'
    data_type: `total_${type}`,
    // 'total_day', // total_month
    key: '8.1',
    time_start: 0,
    // 1543593599,
    time_end,
    //
    limit: 7,
    ...params
  };
  const result = await fakeRequest(newParams);
  const format = typeFormatMapping[type]; // console.log('_parseStatisticsData(response, format)', _parseStatisticsData(result, format));

  return _parseStatisticsData(result, format); // return new Promise((resove) => resove(1));
  // return new Promise((resolve, reject) => {
  //   // 只有在message === ok时，才算成功
  //   Service.smarthome.getUserStatistics(newParams)
  //     .then(({ code, message, result }) => {
  //       if (message !== 'ok') {
  //         reject(message);
  //       }
  //       resolve(result);
  //     }).catch((err: Error) => reject(err));
  // });
};

const getUserStatisticsByTabItem = async ({
  items
}) => {
  const requests = items.map(({
    type,
    params
  }) => getUserStatisticsByDataType({
    type,
    params
  }));
  const responses = await Promise.all(requests);
  return responses; // { type: key, value: responses };
};

const getUserStatistics = async params => {
  if (Array.isArray(params)) {
    const requests = params.map(({
      items
    }) => getUserStatisticsByTabItem({
      items
    }));
    const responses = await Promise.all(requests);
    return responses;
  }

  const {
    items
  } = params;
  const response = getUserStatisticsByTabItem({
    items
  });
  return response;
};

export default getUserStatistics;