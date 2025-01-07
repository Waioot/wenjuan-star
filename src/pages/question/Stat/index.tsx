import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

function Stat() {
  const { loading, questionData } = useLoadQuestionData();
  return (
    <div>
      <h1>Stat page</h1>
      {loading && <div>加载中...</div>}
      {!loading && <div>{JSON.stringify(questionData)}</div>}
    </div>
  );
}

export default Stat;
