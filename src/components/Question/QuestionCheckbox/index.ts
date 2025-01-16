import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
import { QuestionCheckboxDefaultProps } from './interface';

export * from './interface';

// Radio 单选组件配置
export default {
  title: '多选',
  type: 'questionCheckbox',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent, // 统计组件
};
