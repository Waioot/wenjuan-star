import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { getQuestionStatService } from '../../../services/stat';
import { Typography, Spin, Table, Pagination } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { STAT_PAGE_SIZE } from '../../../constant';
const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

function PageStat({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}: PropsType) {
  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatService(id, {
        page,
        pageSize,
      });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        setTotal(res.total);
        setList(res.list);
      },
    }
  );

  const { componentList } = useGetComponentInfo();

  const colums = componentList.map(c => {
    const { fe_id, type, title, props = {} } = c;
    const { text = '' } = props;
    return {
      // title: text || title,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <span
            style={{
              color: fe_id === selectedComponentId ? '#1890ff' : 'inherit',
            }}
          >
            {text || title}
          </span>
        </div>
      ),
      dataIndex: fe_id,
      key: fe_id,
    };
  });

  // 转换数据 添加一个 key
  const dataSource = list.map((i: any) => {
    return {
      ...i,
      key: i._id,
    };
  });

  const tableElement = (
    <>
      <Table columns={colums} dataSource={dataSource} pagination={false} />
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
          <Spin spinning={loading} size='large'></Spin>
        </div>
      )}
      {!loading && tableElement}
    </div>
  );
}

export default PageStat;
