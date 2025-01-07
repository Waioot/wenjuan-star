import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
export default function useLoadQuestionData() {
  const { id = '' } = useParams();
  //   const [loading, setLoading] = useState(false);
  //   const [questionData, setQuestionData] = useState({});
  //   useEffect(() => {
  //     async function fetchData() {
  //       setLoading(true);
  //       const res = await getQuestionService(id as string);
  //       setQuestionData(res);
  //       setLoading(false);
  //     }
  //     fetchData();
  //   }, []);
  //   return { loading, questionData };

  // 使用useRequest重构
  async function load() {
    const data = await getQuestionService(id as string);
    return data;
  }
  const { data, loading, error } = useRequest(load);
  return { loading, data, error };
}
