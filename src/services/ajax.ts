import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  timeout: 5000,
});

// response interceptor: 拦截响应数据，统一处理
instance.interceptors.response.use((res: AxiosResponse) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }
  // 修改返回值，包装在 res 对象中
  res.data = data;
  return res;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
