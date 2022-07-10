import App from 'App';
import { store } from 'app/store';
import 'assets/styles/global.css';
import DefaultTheme from 'components/common/DefaultTheme';
import initI18n from 'i18n';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

initI18n().then(() => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>
            <DefaultTheme>
              <App />
            </DefaultTheme>
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
});

reportWebVitals();
