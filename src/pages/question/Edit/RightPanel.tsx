import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

enum TAB_KEYS {
  PROP = 'prop',
  SETTING = 'setting',
}

function RightPanel() {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP);
  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP);
    else setActiveKey(TAB_KEYS.SETTING);
  }, [selectedId]);

  const tabItems = [
    {
      label: '属性',
      key: TAB_KEYS.PROP,
      icon: <FileTextOutlined />,
      children: <ComponentProp />,
    },
    {
      label: '页面设置',
      key: TAB_KEYS.SETTING,
      icon: <SettingOutlined />,
      children: <PageSetting />,
    },
  ];
  return <Tabs items={tabItems} activeKey={activeKey} />;
}

export default RightPanel;
