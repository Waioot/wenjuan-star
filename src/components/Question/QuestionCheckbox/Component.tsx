import { Checkbox, Space, Typography } from 'antd';
import {
  QuestionCheckboxDefaultProps,
  QuestionCheckboxPropsType,
} from './interface';

const { Paragraph } = Typography;

function Component({
  title = QuestionCheckboxDefaultProps.title,
  isVertical = QuestionCheckboxDefaultProps.isVertical,
  list = QuestionCheckboxDefaultProps.list || [],
}: QuestionCheckboxPropsType) {
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => (
          <Checkbox value={opt.value} key={opt.value} checked={opt.checked}>
            {opt.text}
          </Checkbox>
        ))}
      </Space>
    </div>
  );
}

export default Component;
