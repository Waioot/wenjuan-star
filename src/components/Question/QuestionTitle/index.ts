import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

// 组件配置信息
export default {
  title: '标题',
  type: 'questionTitle',
  Component, // 画布显示的组件
  PropComponent, // 修改属性的组件
  defaultProps: QuestionTitleDefaultProps,
};
