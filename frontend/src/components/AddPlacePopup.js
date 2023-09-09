import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name,setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <label className="popup__input-container">
          <input id="location-input" className="popup__text popup__text_type_location" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required onChange={handleChangeName} value={name} />
          <span className="location-input-error popup__text-error"></span>
        </label>
        <label className="popup__input-container">
          <input id="image-link-input" className="popup__text popup__text_type_image-link" type="url" name="link" placeholder="Ссылка на картинку" required onChange={handleChangeLink} value={link} />
          <span className="image-link-input-error popup__text-error"></span>
        </label>
      </PopupWithForm>
  )
}

export default AddPlacePopup;