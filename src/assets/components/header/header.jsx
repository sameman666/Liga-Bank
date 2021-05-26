import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <a href="#"><img src='./images/logo.png' alt="ЛИГА Банк"></img></a>
      </div>
      <ul className="header__menu">
        <li><a className="header__link" href="#">Услуги</a></li>
        <li><a className="header__link" href="#">Рассчитать кредит</a></li>
        <li><a className="header__link header__link--active" href="#">Конвертер валют</a></li>
        <li><a className="header__link" href="#">Контакты</a></li>
        <li><a className="header__link" href="#">Задать вопрос</a></li>
      </ul>
      <div className="header__login">
        <a className="header__link header__link--login" href="#">Войти в Интернет-банк</a>
      </div>
    </header>
  );
};

export default Header;
