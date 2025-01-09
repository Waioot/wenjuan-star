import { Typography } from 'antd';
import { QuestionParagraphPropsType } from './interface';

const { Paragraph } = Typography;

function QuestionParagraph({
  text = '一行段落',
  isCenter = false,
}: QuestionParagraphPropsType) {
  const textList = text.split('\n');

  return (
    <div>
      <Paragraph
        style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}
      >
        {textList.map((t, index) => (
          <span key={index}>
            {t}
            {index < textList.length - 1 && <br />}
          </span>
        ))}
      </Paragraph>
    </div>
  );
}

export default QuestionParagraph;
