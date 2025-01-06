import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
function MainLayout() {
  return (
    <div>
      <div>Manage layout header</div>
      <div>
        <Outlet />
      </div>
      <div>Manage layout footer</div>
    </div>
  );
}

export default MainLayout;
