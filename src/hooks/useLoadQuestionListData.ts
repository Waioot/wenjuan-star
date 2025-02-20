import { getQuestionListService } from '../services/question';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant';

type SearchOption = {
  isStar?: boolean;
  isDeleted?: boolean;
};

export default function useLoadQuestionListData(
  option: Partial<SearchOption> = {}
) {
  const { isStar, isDeleted } = option;
  const [searchParams] = useSearchParams();

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
        LIST_PAGE_SIZE;
      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      });
      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );
  return { loading, data, error };
}
