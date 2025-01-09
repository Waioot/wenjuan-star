import { Form, Input, Checkbox, Select } from 'antd';

import { QuestionTitlePropsType } from './interface';
import { useEffect } from 'react';
function PropComponent({
  text,
  level,
  isCenter,
  onChange,
}: QuestionTitlePropsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <Form
      layout='vertical'
      form={form}
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label='标题内容'
        name='text'
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='层级' name='level'>
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item name='isCenter' valuePropName='checked'>
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
