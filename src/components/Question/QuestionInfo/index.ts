import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionInfoDefaultProps } from './interface';

export * from './interface';

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionInfoDefaultProps,
};
