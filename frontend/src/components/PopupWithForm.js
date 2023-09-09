function PopupWithForm(props) {
  return (
    <div className={`popup popup_function_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="popup__content" name={props.name} noValidate onSubmit={props.onSubmit}>
          <button className="popup__close-button" type="button" aria-label="закрыть" onClick={props.onClose}></button>
          <h3 className="popup__title">{props.title}</h3>
          <div>{props.children}</div>
          <button className="popup__save-button" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;

/*<div className="popup popup_function_edit-profile">
        <div className="popup__container">
          <form className="popup__content" name="edit-form" novalidate>
            <button className="popup__close-button" type="button" aria-label="закрыть"></button>
            <h3 className="popup__title">Редактировать профиль</h3>
            <label className="popup__input-container">
              <input id="name-input" className="popup__text popup__text_type_name" type="text" name="name" placeholder="Ваше имя" minlength="2" maxlength="40" required/>
              <span className="name-input-error popup__text-error"></span>
            </label>
            <label className="popup__input-container">
              <input id="status-input" className="popup__text popup__text_type_status" type="text" name="about" placeholder="О себе" minlength="2" maxlength="200" required/>
              <span className="status-input-error popup__text-error"></span>
            </label>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </form>
        </div>
      </div>*/

      /*<div className="popup popup_function_add-card">
        <div className="popup__container">
          <form className="popup__content" name="add-form" novalidate>
            <button className="popup__close-button" type="button" aria-label="закрыть"></button>
            <h3 className="popup__title">Новое место</h3>
            <label className="popup__input-container">
              <input id="location-input" className="popup__text popup__text_type_location" type="text" name="name" placeholder="Название" minlength="2" maxlength="30" required/>
              <span className="location-input-error popup__text-error"></span>
            </label>
            <label className="popup__input-container">
              <input id="image-link-input" className="popup__text popup__text_type_image-link" type="url" name="link" placeholder="Ссылка на картинку" required/>
              <span className="image-link-input-error popup__text-error"></span>
            </label>
            <button className="popup__save-button" type="submit">Создать</button>
          </form>
        </div>
      </div>*/

      /*<div className="popup popup_function_edit-avatar">
        <div className="popup__container">
          <form className="popup__content" name="avatar-form" novalidate>
            <button className="popup__close-button" type="button" aria-label="закрыть"></button>
            <h3 className="popup__title">Обновить аватар</h3>
            <label className="popup__input-container">
              <input id="avatar-link-input" className="popup__text popup__text_type_image-link" type="url" name="avatar" placeholder="Ссылка на картинку" required/>
              <span className="avatar-link-input-error popup__text-error"></span>
            </label>
            <button className="popup__save-button" type="submit">Сохранить</button>
          </form>
        </div>
      </div>*/

      /*<div className="popup popup_function_delete">
        <div className="popup__container">
          <div className="popup__content">
            <button className="popup__close-button" type="button" aria-label="закрыть"></button>
            <h3 className="popup__title">Вы уверены?</h3>
            <button className="popup__save-button" type="button">Да</button>
          </div>
        </div>
      </div>*/