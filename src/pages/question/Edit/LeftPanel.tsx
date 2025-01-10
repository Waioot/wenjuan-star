import { Tabs } from 'antd';
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons';
import Lib from './ComponentLib';
import Layers from './Layers';
function LeftPanel() {
  const tabItems = [
    {
      label: '组件库',
      key: 'componentsLib',
      icon: <AppstoreAddOutlined />,
      children: <Lib />,
    },
    {
      label: '图层',
      key: 'layers',
      icon: <BarsOutlined />,
      children: <Layers />,
    },
  ];
  return (
    <Tabs
      items={tabItems}
      defaultActiveKey='componentsLib'
      onChange={key => {
        console.log(key);
      }}
    />
  );
}

export default LeftPanel;
