import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  
  const userData = React.useContext(CurrentUserContext);

  const isOwn = card.owner === userData._id;
  //console.log(userData)
  const isLiked = card.likes.some(item => item === userData._id);

  
  
  //console.log(userData._id)

  function handleCardClick() {
    onCardClick(card);
    //console.log(card)
  }

  function handleDeleteClick() {
    onCardDelete(card);
    console.log('del');
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      {isOwn && <button className="element__trash" type="button" aria-label="удалить карточку" onClick={handleDeleteClick} />}
      <div className="element__items">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <button className={`element__like ${isLiked && "element__like_active"}`} type="button" aria-label="понравилось" onClick={handleLikeClick}></button>
          <p className="element__like-counter">{0 || card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;