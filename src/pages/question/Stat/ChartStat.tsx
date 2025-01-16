import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';

import { getComponentStatService } from '../../../services/stat';
import { getComponentConfigByType } from '../../../components/Question';
import { useParams } from 'react-router-dom';
const { Title } = Typography;
type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

function ChartStat({ selectedComponentId, selectedComponentType }: PropsType) {
  const { id = '' } = useParams();
  const [statData, setStatData] = useState<any[]>([]);
  const { run } = useRequest(
    async (questionId: string, componentId: string) => {
      const res = await getComponentStatService(questionId, componentId);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        setStatData(res.stat);
      },
    }
  );

  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId);
    }
  }, [id, selectedComponentId]);

  // 生成统计图表
  function genStatElement() {
    if (!selectedComponentId) return <div>未选中组件</div>;
    const { StatComponent } =
      getComponentConfigByType(selectedComponentType) || {};
    if (!StatComponent) return <div>组件暂不支持统计</div>;
    return <StatComponent stat={statData} />;
  }

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{genStatElement()}</div>
    </>
  );
}

export default ChartStat;
