import { Pagination } from 'antd';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant';
import { useState, useEffect } from 'react';
type PropsType = {
  total: number;
};

const ListPagination = ({ total }: PropsType) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
      LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    // 跳转页面
    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handleChange}
    />
  );
};

export default ListPagination;
