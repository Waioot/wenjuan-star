import { Typography, Input } from 'antd';
import { QuestionTextareaPropsType } from './interface';

const { Paragraph } = Typography;
const { TextArea } = Input;

function QuestionTextarea({
  title = '多行输入框',
  placeholder = '请输入...',
}: QuestionTextareaPropsType) {
  return (
    <div>
      <Paragraph strong style={{ marginBottom: 0 }}>
        {title}
      </Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  );
}

export default QuestionTextarea;
