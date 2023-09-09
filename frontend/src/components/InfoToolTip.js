import iconYes from '../images/popup__icon_yes.svg';
import iconNo from '../images/popup__icon_no.svg';

function InfoToolTip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container">
        <div className="popup__content popup__content_type_register">
          <button className="popup__close-button" type="button" aria-label="закрыть" onClick={props.onClose}></button>
          <img className="popup__icon" src={props.registeredIn ? iconYes : iconNo} alt="Иконка" />
          <h3 className="popup__title popup__title_type_register">{props.registerText}</h3>
        </div>
      </div>
    </div>
  )
}

export default InfoToolTip;