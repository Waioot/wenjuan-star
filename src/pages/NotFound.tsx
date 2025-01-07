import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MANAGE_LIST_PATHNAME } from '../router';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status='404'
      title='404'
      subTitle='对不起，您访问的页面不存在'
      extra={
        <Button type='primary' onClick={() => navigate(MANAGE_LIST_PATHNAME)}>
          返回首页
        </Button>
      }
    />
  );
}
