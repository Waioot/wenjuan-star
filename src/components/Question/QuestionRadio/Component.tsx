import { Radio, Space, Typography } from 'antd';
import { QuestionRadioPropsType } from './interface';

const { Paragraph } = Typography;

function Component({
  title = '单选标题',
  isVertical = false,
  options = [
    { value: '选项1', text: '选项1' },
    { value: '选项2', text: '选项2' },
  ], // 添加默认选项
  value = '',
}: QuestionRadioPropsType) {
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => (
            <Radio value={opt.value} key={opt.value}>
              {opt.text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
}

export default Component;
