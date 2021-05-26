import React from 'react';
import '../../styles/main.scss';
import Header from '../header/header';
import Main from '../main/main';
import Footer from '../footer/footer';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
};

export default App;
