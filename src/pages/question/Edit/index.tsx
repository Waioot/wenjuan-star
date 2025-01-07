import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../../../services/question';

function Edit() {
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getQuestionService(id as string);
      console.log(res);
    }
    fetchData();
  }, []);
  return <div>Edit {id}</div>;
}

export default Edit;
