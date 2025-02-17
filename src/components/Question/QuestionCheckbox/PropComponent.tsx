import { Form, Input, Checkbox, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { QuestionCheckboxPropsType, OptionType } from './interface';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
function PropComponent({
  title,
  isVertical,
  list = [],
  onChange,
  disabled,
}: QuestionCheckboxPropsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list });
  }, [title, isVertical, list]);

  function handleValuesChange() {
    if (onChange == null) return;

    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType;

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null));
    }

    const { list = [] } = newValues;
    list.forEach(opt => {
      if (opt.value) return;
      opt.value = nanoid(5);
    });

    onChange(newValues);
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleValuesChange}
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

      <Form.Item label='选项' name='list'>
        <Form.List name='list'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => (
                <Space key={key} align='baseline'>
                  {/* 选项是否选中 */}
                  <Form.Item name={[name, 'checked']} valuePropName='checked'>
                    <Checkbox />
                  </Form.Item>
                  {/* 选项输入 */}
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: '请输入选项' },
                      {
                        validator: (_, text) => {
                          const { list = [] } = form.getFieldsValue();
                          let num = 0;
                          list.forEach((opt: OptionType) => {
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
                  {fields.length > 1 && (
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
                <Button
                  type='link'
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item name='isVertical' valuePropName='checked'>
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
}

export default PropComponent;
