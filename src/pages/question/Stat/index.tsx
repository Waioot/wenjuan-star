import { useParams } from 'react-router-dom';

function Stat() {
  const { id } = useParams();
  return <div>Stat {id}</div>;
}

export default Stat;
