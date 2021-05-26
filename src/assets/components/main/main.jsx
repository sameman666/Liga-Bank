import React, {useEffect, useRef} from 'react';
import {MAXIMUM_DAY_RANGE, MAXIMUM_HISTORY_ITEMS, MAXIMUM_SYMBOLS_AFTER_COMMA, ColumnsQuantity, Currency} from '../../utils/const';
import dayjs from "dayjs";
import Flatpickr from "react-flatpickr";
import HistoryList from '../history-list/history-list';
import Intro from '../intro/intro';
import "flatpickr/dist/themes/material_blue.css";
import {connect} from 'react-redux';
import {createStories, clearStories, handleUserHas, handleUserWant, handleUserHasCurrency, handleUserWantCurrency, handleDate, writeData, setServerError, loadRates} from '../../redux/action';
import PropTypes from 'prop-types';

const Main = (props) => {
  console.log(props)
  const has = useRef();
  const want = useRef();

  useEffect(() => {
    if (!props.data.isRatesLoaded) {
      props.loadRates(props.userData.date);
    }
  }, [props.data.isRatesLoaded]);

  if (!props.data.isRatesLoaded) {
    return (
      <h1 style={{textAlign: `center`}}>Загрузка...</h1>
    );
  }

  const returnCurrentRate = (currency) => {
    switch (currency) {
      case Currency.RUB:
        return 1;
      case Currency.USD:
        return props.data.rates.Valute.USD.Value;
      case Currency.EUR:
        return props.data.rates.Valute.EUR.Value;
      case Currency.CNY:
        return props.data.rates.Valute.CNY.Value;
      case Currency.GBP:
        return props.data.rates.Valute.GBP.Value;
      default:
        return null;
    }
  };

  const setEmptyFields = () => {
    props.handleUserHas(``);
    props.handleUserWant(``);
  };

  const userHasInputHandler = () => {
    const currentHasInRubles = returnCurrentRate(props.userData.userHasCurrency) * has.current.value;
    const currentWantInRubles = returnCurrentRate(props.userData.userWantCurrency);
    if (!has.current.value) {
      setEmptyFields();
    } else {
      props.handleUserHas(has.current.value);
      props.handleUserWant((currentHasInRubles / currentWantInRubles).toFixed(MAXIMUM_SYMBOLS_AFTER_COMMA));
    }
  };

  const userWantInputHandler = () => {
    const currentHasInRubles = returnCurrentRate(props.userData.userWantCurrency) * want.current.value;
    const currentWantInRubles = returnCurrentRate(props.userData.userHasCurrency);
    if (!want.current.value) {
      setEmptyFields();
    } else {
      props.handleUserHas((currentHasInRubles / currentWantInRubles).toFixed(MAXIMUM_SYMBOLS_AFTER_COMMA));
      props.handleUserWant(want.current.value);
    }
  };

  const userHasCurrencyHandler = (evt) => {
    props.handleUserHasCurrency(evt.target.value);
    userHasInputHandler();
  };

  const userWantCurrencyHandler = (evt) => {
    props.handleUserWantCurrency(evt.target.value);
    userWantInputHandler();
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    props.createStories(
        {
          date: props.userData.date.format(`DD.MM.YYYY`),
          has: props.userData.userHas,
          hasCurrency: props.userData.userHasCurrency,
          want: props.userData.userWant,
          wantCurrency: props.userData.userWantCurrency
        }
    );
  };

  const clearHistoryHandler = (evt) => {
    evt.preventDefault();
    props.clearStories();
  };

  const swapValues = () => {
    props.handleUserHas(props.userData.userWant);
    props.handleUserWant(props.userData.userHas);
  };

  return (
    <main className="main">
      <Intro />
      <section className="main__converter">
        <h2 className="main__converter-title">Конвертер валют</h2>
        <form className="main__converter-form" onSubmit={submitHandler}>
          <div className="main__converter-amounts">
            <div className="main__converter-input">
              <label htmlFor="have">У меня есть</label>
              <input type="number" id="have" name="have" ref={has} value={props.userData.userHas} onChange={userHasInputHandler} required></input>
              <select onChange={userHasCurrencyHandler}>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CNY">CNY</option>
              </select>
            </div>
            <div className="main__converter-input">
              <label htmlFor="want">Хочу приобрести</label>
              <input type="number" id="want" name="want" ref={want} value={props.userData.userWant} onChange={userWantInputHandler} required></input>
              <select onChange={userWantCurrencyHandler}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CNY">CNY</option>
                <option value="RUB">RUB</option>
              </select>
            </div>
            <button onClick={swapValues} className="main__converter-swap-button" type="button"></button>
          </div>
          <div className="main__converter-results">
            <label htmlFor="date" className="visually-hidden">Дата</label>
            <Flatpickr
              id="date"
              name="date"
              value={props.userData.date.format(`DD.MM.YYYY`)}
              onChange={(date) => props.loadRates(date)}
              options={{
                dateFormat: `d.m.Y`,
                minDate: dayjs().subtract(MAXIMUM_DAY_RANGE, `day`).toDate(),
                maxDate: dayjs().toDate(),
              }}
            />
            <button className="main__converter-btn main__converter-btn--save" type="submit">Сохранить результат</button>
          </div>
          {props.data.isError && <p className="main__converter-error">Что-то пошло не так. Возможно курс ЦБ РФ на данную дату не установлен. Проверить: <a href="https://www.cbr.ru/currency_base/daily/">https://www.cbr.ru/currency_base/daily/</a></p>}
          <div className="main__converter-history">
            <h3 className="main__history-title">История конвертации</h3>
            <div className="main__history-list-wrapper">
              <HistoryList stories={props.stories.slice(ColumnsQuantity.START, ColumnsQuantity.END)} />
              {props.stories.length > ColumnsQuantity.END && <HistoryList stories={props.stories.slice(ColumnsQuantity.END, MAXIMUM_HISTORY_ITEMS)} isSecondColumn={true}/>}
            </div>
            <button className="main__converter-btn main__converter-btn--reset" type="reset" onClick={clearHistoryHandler}>Очистить историю</button>
          </div>
        </form>
      </section>
    </main>
  );
};

Main.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    has: PropTypes.string,
    hasCurrency: PropTypes.string,
    want: PropTypes.string,
    wantCurrency: PropTypes.string,
  })).isRequired,
  userData: PropTypes.object,
  data: PropTypes.object,
  createStories: PropTypes.func,
  clearStories: PropTypes.func,
  handleUserHas: PropTypes.func,
  handleUserWant: PropTypes.func,
  handleUserHasCurrency: PropTypes.func,
  handleUserWantCurrency: PropTypes.func,
  handleDate: PropTypes.func,
  writeData: PropTypes.func,
  setServerError: PropTypes.func,
  loadRates: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    stories: state.stories.stories,
    userData: state.userData,
    data: state.data
  };
};

const mapDispatchToProps = {
  createStories,
  clearStories,
  handleUserHas,
  handleUserWant,
  handleUserHasCurrency,
  handleUserWantCurrency,
  handleDate,
  writeData,
  setServerError,
  loadRates
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
