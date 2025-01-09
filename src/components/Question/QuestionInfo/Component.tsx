import { Typography } from 'antd';
import { QuestionInfoPropsType } from './interface';

const { Paragraph, Title } = Typography;

function QuestionInfo({
  title = '问卷标题',
  desc = '',
}: QuestionInfoPropsType) {
  const descList = desc.split('\n');
  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={5} style={{ fontSize: '24px', marginBottom: 0 }}>
        {title}
      </Title>
      <Paragraph>
        {descList.map((d, index) => (
          <span key={index}>
            {d}
            {index < descList.length - 1 && <br />}
          </span>
        ))}
      </Paragraph>
    </div>
  );
}

export default QuestionInfo;
