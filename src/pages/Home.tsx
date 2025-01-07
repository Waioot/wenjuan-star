import { Link } from 'react-router-dom';
import { Button } from 'antd';
function Home() {
  return (
    <div>
      <h1>问卷星</h1>
      <div>
        <Button type='primary'>
          <Link to='/login'>登录</Link>
        </Button>
        <Button type='primary'>
          <Link to='/register'>注册</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
