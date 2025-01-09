import { Form, Input } from 'antd';

const { TextArea } = Input;
import { QuestionTextareaPropsType } from './interface';
import { useEffect } from 'react';
function PropComponent({
  title,
  placeholder,
  onChange,
  disabled,
}: QuestionTextareaPropsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout='vertical'
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label='标题'
        name='title'
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='Placeholder' name='placeholder'>
        <TextArea />
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
