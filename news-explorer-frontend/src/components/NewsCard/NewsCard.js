import './NewsCard.css';
function NewCard(props) {
  const loggedIn = props.loggedIn;
  const {
    image,
    title,
    date,
    text,
    keyword,
    source,
  } = props.article;

  return (
    <article className='articles__article'>
      <figure className='articles__img-container'>
        <img src={image} className='articles__img' alt='article-img' />
        {!loggedIn && <p className='articles__hover-text articles__hover-text_signin'>Signin to save articles</p>}
        {!loggedIn && <button type='button' className='articles__signin-btn'>
        </button>}
        {loggedIn && <p className='articles__keyword'>{keyword}</p>}

        {loggedIn && <p className='articles__hover-text articles__hover-text_trash'>Remove from Saved</p>}

        {loggedIn && <button className='articles__trash-btn'></button>}

        <figcaption className='articles__date'>
          {date}
        </figcaption>
      </figure>
      <div className='articles__content'>
        <h3 className='articles__title'>{title}</h3>
        <p className='articles__text'>{text}</p>
        <p className='articles__source'>{source}</p>
      </div>
    </article>
  )
}
export default NewCard;
