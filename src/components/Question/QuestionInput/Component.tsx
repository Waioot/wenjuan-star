import { Typography, Input } from 'antd';
import { QuestionInputPropsType } from './interface';

const { Paragraph } = Typography;

function QuestionInput({
  title = '请输入标题',
  placeholder = '请输入...',
}: QuestionInputPropsType) {
  return (
    <div>
      <Paragraph strong style={{ marginBottom: 0 }}>
        {title}
      </Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
}

export default QuestionInput;
