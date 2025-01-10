import type { FC } from 'react';
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput';
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from './QuestionParagraph';
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextareaConf, {
  QuestionTextareaPropsType,
} from './QuestionTextarea';
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio';
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
} from './QuestionCheckbox';

// 统一的组件属性类型
export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

// 统一的组件配置类型
export type ComponentConfigType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部组件的配置列表
export const componentListMap: ComponentConfigType[] = [
  QuestionTitleConf,
  QuestionInputConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textDisplayGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'userInputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'choiceGroup',
    groupName: '选择框',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

// 根据组件类型获取组件配置
export const getComponentConfigByType = (type: string) => {
  return componentListMap.find(c => c.type === type);
};
