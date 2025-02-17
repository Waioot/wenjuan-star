import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { STAT_CHART_COLORS } from '../../../constant';
import { QuestionRadioStatPropsType } from './interface';
import { useMemo } from 'react';

type StatComponentPropsType = {
  stat: QuestionRadioStatPropsType['stat'];
};

function getPercent(value: number, total: number) {
  return ((value / total) * 100).toFixed(2);
}

// 统计图表组件
function StateComponent({ stat = [] }: StatComponentPropsType) {
  const sum = useMemo(() => {
    return stat.reduce((pre, cur) => pre + cur.count, 0);
  }, [stat]);
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={300}>
          <Pie
            dataKey='count'
            data={stat}
            cx='50%'
            cy='50%'
            outerRadius={50}
            fill='#82ca9d'
            label={({ name, count }) => `${name}: ${getPercent(count, sum)}%`}
            labelLine={false}
          >
            {stat.map((_, index) => (
              <Cell key={`cell-${index}`} fill={STAT_CHART_COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StateComponent;
