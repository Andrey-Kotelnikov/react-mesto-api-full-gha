import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIssAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false)

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registeredIn, setRegisteredIn] = React.useState(false);

  const[userData, setUserData] = React.useState({});

  const navigate = useNavigate();

  //const token = localStorage.getItem('token');

  const registerText = registeredIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'

  function tokenCheck () {
    auth.getContent().then((res) => {
      const userData = {
        email: res.data.email
      }
      console.log('авторизация')
      setUserData(userData);
      setLoggedIn(true)
      navigate('/main', {replace: true})
    })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      }) 
  }

  React.useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      console.log('эффект загрузки данных')
      Promise.all([
        api.getProfile(),
        api.getItems()
      ])
        .then(([userInfo, initialCards]) => { 
          setCurrentUser(userInfo.data);
          setCards(initialCards);
        })
        .catch((err) => {console.log(err)})
    }
  }, [loggedIn]);


 

  function handleLogin(isLog) {
    setLoggedIn(isLog);
  }

  function handleRegister(isReg) {
    setIsRegisterPopupOpen(true);
    setRegisteredIn(isReg);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLikeCard(card) {
    console.dir(card)

    const isLiked = card.likes.some(i => i === currentUser._id);
    
    if (!isLiked) {
      api.like(card._id)
        .then((newCard) => {
          console.dir(newCard)
          setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch((err) => {console.log(err)})
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          console.dir(newCard)
          setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch((err) => {console.log(err)})
    }
  }

  function handleCardDelete(card) {
    console.log(card)
    api.deleteItem(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {console.log(err)})
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then(() => {
        setCurrentUser({...currentUser, name: data.name, about: data.about});
        console.log(currentUser)
        closeAllPopups();
      })
      .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then(() => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch((err) => {console.log(err)})
  }

  function handleAddPlaceSubmit(data) {
    api.createItem(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        console.log(newCard)
      })
      .catch((err) => {console.log(err)})
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIssAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIssAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsRegisterPopupOpen(false);
    console.log('close');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userData={userData} loggedIn={loggedIn} handleLogin={handleLogin} />
      <Routes>
        <Route path='/' element={loggedIn ? <Navigate to='main' replace /> : <Navigate to='sign-in' replace />} />
        <Route path='/sign-in' element={<Login handleLogin={handleLogin} setUserData={setUserData} />} />
        <Route path='/sign-up' element={<Register handleRegister={handleRegister} />} />
        
        <Route path='/main' element={<ProtectedRoute
          element={Main}
          loggedIn={loggedIn}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleLikeCard}
          onCardDelete={handleCardDelete}
        />} />
      </Routes>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoToolTip registerText={registerText} registeredIn={registeredIn} isOpen={isRegisterPopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;