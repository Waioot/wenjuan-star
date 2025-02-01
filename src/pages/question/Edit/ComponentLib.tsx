import { addComponent } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import {
  componentConfGroup,
  ComponentConfigType,
} from '../../../components/Question';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
const { Title } = Typography;

function GenComponent(c: ComponentConfigType) {
  const { Component, title, type, defaultProps } = c;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  };

  return (
    <div key={type} className={styles.wapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

function Lib() {
  return (
    <>
      {componentConfGroup.map((group, index) => (
        <div key={group.groupId}>
          <Title
            level={3}
            style={{ fontSize: '16px', marginBottom: index === 0 ? 0 : '20px' }}
          >
            {group.groupName}
          </Title>
          <div>{group.components.map(c => GenComponent(c))}</div>
        </div>
      ))}
    </>
  );
}

export default Lib;
