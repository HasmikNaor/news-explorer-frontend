import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNewsPage(props) {
  return (
    <>
      <SavedNewsHeader {...props} />
      {props.savedArticles.length > 0 && <SavedNews {...props} />}
    </>
  );
}

export default SavedNewsPage;
