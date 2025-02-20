import { useEffect } from 'react';
import { Form, Input } from 'antd';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '../../../store/pageInfoReducer';

const { TextArea } = Input;

function PageSetting() {
  const pageInfo = useGetPageInfo();

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  return (
    <Form
      layout='vertical'
      form={form}
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label='问卷标题'
        name='title'
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder='请输入问卷标题' />
      </Form.Item>
      <Form.Item label='问卷描述' name='desc'>
        <Input placeholder='请输入问卷描述' />
      </Form.Item>
      <Form.Item label='样式代码' name='css'>
        <TextArea placeholder='请输入样式代码' />
      </Form.Item>
      <Form.Item label='脚本代码' name='js'>
        <TextArea placeholder='请输入脚本代码' />
      </Form.Item>
    </Form>
  );
}

export default PageSetting;
