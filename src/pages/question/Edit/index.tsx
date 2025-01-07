import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

function Edit() {
  const { loading, questionData } = useLoadQuestionData();
  return (
    <div>
      <h1>Edit page</h1>
      {loading && <div>加载中...</div>}
      {!loading && <div>{JSON.stringify(questionData)}</div>}
    </div>
  );
}

export default Edit;
