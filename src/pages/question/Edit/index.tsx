import styles from './index.module.scss';
function Edit() {
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '60px' }}>header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '1000px' }}>测试滚动</div>
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
