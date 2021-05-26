import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <a href="#"><img src='./images/logo.png' alt="ЛИГА Банк"></img></a>
        <p className="footer__text">150015, г. Москва, ул. Московская, д. 32 Генеральная лицензия Банка России №1050 Ⓒ Лига Банк, 2019</p>
      </div>
      <ul className="footer__menu">
        <li><a href="#">Услуги</a></li>
        <li><a href="#">Рассчитать кредит</a></li>
        <li><a href="#">Контакты</a></li>
        <li><a href="#">Задать вопрос</a></li>
      </ul>
      <div className="footer__contacts">
        <div className="footer__free-mobile">
          <a href="tel:0904">*0904</a>
          <p className="footer__text">Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
        </div>
        <div className="footer__free-all">
          <a href="tel:88001112233">8 800 111 22 33</a>
          <p className="footer__text">Бесплатный для всех городов России</p>
        </div>
      </div>
      <ul className="footer__social">
        <li><a className="footer__social-link footer__social-link--facebook" href="#"></a></li>
        <li><a className="footer__social-link footer__social-link--instagram" href="#"></a></li>
        <li><a className="footer__social-link footer__social-link--twitter" href="#"></a></li>
        <li><a className="footer__social-link footer__social-link--youtube" href="#"></a></li>
      </ul>
    </footer>
  );
};

export default Footer;
