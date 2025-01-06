import { Outlet, Link } from 'react-router-dom';
import styles from './ManageLayout.module.scss';

function Mainlayout() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        Manage layout left
        <button>创建问卷</button>
        <Link to='/manage/list'>我的列表</Link>
        <Link to='/manage/star'>标星问卷</Link>
        <Link to='/manage/trash'>回收站</Link>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}

export default Mainlayout;
