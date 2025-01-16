import axios, { ResDataType } from './ajax';

// 获取一个问卷的提交数据
export async function getQuestionStatService(
  questionId: string,
  option: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: option })) as ResDataType;
  return data;
}

// 获取一个问卷的选项特定选项（组件）的统计数据
export async function getComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
