import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { InputProvider } from './context/ContextProvider';
import { Header } from './components/header'
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.allBody}>
      <InputProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </InputProvider>
    </div >
  );
}

export default App;