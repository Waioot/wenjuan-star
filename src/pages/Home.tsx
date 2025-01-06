import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>问卷星</h1>
      <div>
        <Link to='/login'>登录</Link>
        <Link to='/register'>注册</Link>
      </div>
    </div>
  );
}

export default Home;
