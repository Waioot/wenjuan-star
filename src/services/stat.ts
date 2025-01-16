import axios, { ResDataType } from './ajax';

export async function getQuestionStatService(
  questionId: string,
  option: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: option })) as ResDataType;
  return data;
}
