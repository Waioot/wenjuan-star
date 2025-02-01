import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Input,
  InputRef,
  Space,
  Tooltip,
  message,
  QRCode,
  Popover,
} from 'antd';
import {
  ArrowLeftOutlined,
  CopyOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import { useMemo } from 'react';
import styles from './StatHeader.module.scss';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useRef } from 'react';

const { Title } = Typography;

function StatHeader() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, isPublished } = useGetPageInfo();

  const urlRef = useRef<InputRef>(null);

  function copy() {
    const elem = urlRef.current;
    if (elem === null) return;
    elem.select(); // 选中
    document.execCommand('copy'); // 复制
    message.success('复制成功');
  }

  // function genLinkAndQRCode() {
  //   if (!isPublished) return null;
  //   const url = `http://localhost:3000/question/stat/${id}`; // 生成问卷链接 参考 c 端的规则
  //   return (
  //     <Space>
  //       <Input value={url} style={{ width: '300px' }} ref={urlRef} />
  //       <Tooltip title='复制链接'>
  //         <Button
  //           type='primary'
  //           icon={<CopyOutlined />}
  //           onClick={() => copy()}
  //         ></Button>
  //       </Tooltip>

  //       <Popover content={<QRCode value={url} bordered={false} />}>
  //         <Button type='primary' icon={<QrcodeOutlined />} />
  //       </Popover>
  //     </Space>
  //   );
  // }

  // 使用 useMemo 优化
  const genLinkAndQRCode = useMemo(() => {
    if (!isPublished) return null;
    const url = `http://localhost:3000/question/stat/${id}`; // 生成问卷链接 参考 c 端的规则
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlRef} />
        <Tooltip title='复制链接'>
          <Button
            type='primary'
            icon={<CopyOutlined />}
            onClick={() => copy()}
          ></Button>
        </Tooltip>
        <Popover content={<QRCode value={url} bordered={false} />}>
          <Button type='primary' icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }, [isPublished, id]);

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type='link'
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            >
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCode}</div>
        <div className={styles.right}>
          <Button
            type='primary'
            onClick={() => navigate(`/question/edit/${id}`)}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StatHeader;
