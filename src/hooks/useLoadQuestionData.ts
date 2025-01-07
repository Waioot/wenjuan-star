import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';

export default function useLoadQuestionData() {
  const { id = '' } = useParams();
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getQuestionService(id as string);
      setQuestionData(res);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { loading, questionData };
}
