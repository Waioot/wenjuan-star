import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  return <div>Edit {id}</div>;
}

export default Edit;
