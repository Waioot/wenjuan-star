import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { resetComponents } from '../store/componentsReducer';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
export default function useLoadQuestionData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  // 加载数据
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('id is required');
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  // id变化时，加载数据
  useEffect(() => {
    run(id);
  }, [id]);

  // 将数据存储到redux中
  useEffect(() => {
    if (data) {
      const { componentList } = data;

      // 默认选中第一个
      let selectedId = '';
      if (componentList.length > 0) {
        selectedId = componentList[0].fe_id;
      }

      // 将componentList存储到redux中
      dispatch(
        resetComponents({ componentList, selectedId, copiedComponent: null })
      );
    }
  }, [data]);

  return { loading, error };
}
