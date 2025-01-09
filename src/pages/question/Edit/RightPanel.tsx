import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';
function RightPanel() {
  const tabItems = [
    {
      label: '属性',
      key: 'prop',
      icon: <FileTextOutlined />,
      children: <ComponentProp />,
    },
    {
      label: '页面设置',
      key: 'setting',
      icon: <SettingOutlined />,
      children: <div>页面设置</div>,
    },
  ];
  return <Tabs items={tabItems} defaultActiveKey='prop' />;
}

export default RightPanel;
