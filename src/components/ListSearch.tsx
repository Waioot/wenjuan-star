import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input;

function ListSearch() {
  const [searchValue, setSearchValue] = useState('');

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const newKeyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setSearchValue(newKeyword);
  }, [searchParams]);

  const handleSearch = (value: string) => {
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };

  return (
    <Search
      placeholder='请输入关键字'
      onSearch={handleSearch}
      size='large'
      allowClear
      onChange={e => setSearchValue(e.target.value)}
      value={searchValue}
      style={{ width: '260px' }}
    />
  );
}

export default ListSearch;
