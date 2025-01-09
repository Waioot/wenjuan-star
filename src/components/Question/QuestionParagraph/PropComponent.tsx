import { Form, Input, Checkbox } from 'antd';

const { TextArea } = Input;
import { QuestionParagraphPropsType } from './interface';
import { useEffect } from 'react';
function PropComponent({
  text,
  isCenter,
  onChange,
  disabled,
}: QuestionParagraphPropsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout='vertical'
      form={form}
      initialValues={{ text, isCenter }} // 初始化表单值
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label='段落内容'
        name='text'
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item label='是否居中' name='isCenter' valuePropName='checked'>
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
