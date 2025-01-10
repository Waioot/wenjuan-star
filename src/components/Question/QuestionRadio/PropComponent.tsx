import { Form, Input, Select, Checkbox, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { QuestionRadioPropsType, OptionType } from './interface';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
function PropComponent({
  title,
  isVertical,
  options = [],
  value,
  onChange,
  disabled,
}: QuestionRadioPropsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value });
  }, [title, isVertical, options, value]);

  function handleValueChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionRadioPropsType;
      // 过滤掉空选项
      if (newValues.options) {
        newValues.options = newValues.options
          .filter(opt => !(opt.text === null))
          .map(opt => ({
            text: opt.text,
            value: opt.value || nanoid(5),
          }));
      }
      onChange(newValues);
    }
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleValueChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label='标题'
        name='title'
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='选项' name='options'>
        <Form.List name='options'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Space key={key} align='baseline'>
                  {/* 选项输入 */}
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项' },
                      {
                        validator: (_, text) => {
                          const { options = [] } = form.getFieldsValue();
                          let num = 0;
                          options.forEach((opt: OptionType) => {
                            if (opt.text === text) num++;
                          });
                          return num === 1
                            ? Promise.resolve()
                            : Promise.reject('和其他选项重复');
                        },
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  {/* 删除选项 */}
                  {fields.length > 2 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);
                      }}
                    />
                  )}
                </Space>
              ))}
              {/* 添加选项 */}
              <Form.Item>
                <Button type='link' onClick={add} icon={<PlusOutlined />} block>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label='默认选中' name='value'>
        <Select
          value={value}
          options={options.map(opt => ({
            value: opt.value,
            label: opt.text,
          }))}
        ></Select>
      </Form.Item>

      <Form.Item name='isVertical' valuePropName='checked'>
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
