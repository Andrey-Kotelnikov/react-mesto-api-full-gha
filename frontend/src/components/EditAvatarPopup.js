import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    setAvatar('');
  }, [props.isOpen]);

  function handleChangeAvatar(evt) {
    setAvatar(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({avatar: inputRef.current.value})
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__input-container">
        <input id="avatar-link-input" className="popup__text popup__text_type_image-link" type="url" name="avatar" placeholder="Ссылка на картинку" required onChange={handleChangeAvatar} ref={inputRef} value={avatar}/>
        <span className="avatar-link-input-error popup__text-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;