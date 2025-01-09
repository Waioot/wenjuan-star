import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTextareaDefaultProps } from './interface';

export * from './interface';

// Textarea 组件配置
export default {
  title: '多行输入框',
  type: 'questionTextarea',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTextareaDefaultProps,
};
