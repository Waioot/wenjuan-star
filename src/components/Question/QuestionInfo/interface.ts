export type QuestionInfoPropsType = {
  title?: string;
  desc?: string;
  // 用于属性表单
  onChange?: (newProps: QuestionInfoPropsType) => void;
  disabled?: boolean;
};

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '请输入标题',
  desc: '请输入描述',
};
