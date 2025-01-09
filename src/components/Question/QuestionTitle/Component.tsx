import { Typography } from 'antd';
import { QuestionTitlePropsType } from './interface';

const { Title } = Typography;

function QuestionTitle({
  text = '一级标题',
  level = 1,
  isCenter = false,
}: QuestionTitlePropsType) {
  function genFontSize(level: number) {
    if (level === 1) return '24px';
    if (level === 2) return '20px';
    if (level === 3) return '16px';
    return '16px';
  }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: 0,
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Title>
  );
}

export default QuestionTitle;
