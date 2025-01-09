import { Form, Input } from 'antd';

const { TextArea } = Input;
import { QuestionInfoPropsType } from './interface';
import { useEffect } from 'react';
function PropComponent({
  title,
  desc,
  onChange,
  disabled,
}: QuestionInfoPropsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);

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
      <Form.Item label='描述' name='desc'>
        <TextArea />
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
