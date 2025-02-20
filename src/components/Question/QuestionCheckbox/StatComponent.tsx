import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';

import { QuestionCheckboxStatPropsType } from './interface';

type StatComponentPropsType = {
  stat: QuestionCheckboxStatPropsType['stat'];
};

// 统计图表组件
function StateComponent({ stat = [] }: StatComponentPropsType) {
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={400}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey='count'
            fill='#8884d8'
            activeBar={<Rectangle fill='pink' stroke='blue' />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StateComponent;
