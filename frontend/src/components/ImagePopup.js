function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_function_image ${card.name !== undefined ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" aria-label="закрыть" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}/>
        <h3 className="popup__image-text">{card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;