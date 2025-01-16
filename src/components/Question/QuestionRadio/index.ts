import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
import { QuestionRadioDefaultProps } from './interface';

export * from './interface';

// Radio 单选组件配置
export default {
  title: '单选',
  type: 'questionRadio',
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionRadioDefaultProps,
  StatComponent, // 统计图表组件
};
