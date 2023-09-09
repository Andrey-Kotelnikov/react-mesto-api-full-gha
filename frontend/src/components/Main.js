import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext)
  
  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button className="profile__edit-button" type="button" aria-label="редактировать профиль" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards.map((element) => (
          <Card 
            key={element._id}
            card={element}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;