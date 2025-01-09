import type { FC } from 'react';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';

// 统一的组件属性类型
export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType;

// 统一的组件配置类型
export type ComponentConfigType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部组件的配置列表
export const componentListMap: ComponentConfigType[] = [
  QuestionTitleConf,
  QuestionInputConf,
];

// 根据组件类型获取组件配置
export const getComponentConfig = (type: string) => {
  return componentListMap.find(c => c.type === type);
};
