import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from '../utils/auth.js';

function Register(props) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = formValue;
    auth.register(email, password)
      .then((res) => {
        if (res) {
          console.log(res)
          props.handleRegister(true);
          navigate('/sign-in', {replace: true});
        } else {
          props.handleRegister(false);
        }
      })
      .catch((err) => {console.log(err)})
  }

  return (
    <form className="login__form" name="register-form" onSubmit={handleSubmit}>
      <h3 className="login__title">Регистрация</h3>
      <input className="login__input" id="email" name="email" value={formValue.email} placeholder="Email" type="email" onChange={handleChange} required />
      <input className="login__input" id="password" name="password" value={formValue.password} placeholder="Пароль" type="password" onChange={handleChange} required />
      <button className="login__save-button">Зарегистрироваться</button>
      <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
    </form>
  )
}

export default Register;