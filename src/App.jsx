import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RouterComponent from './app/routes/RouterComponent';
import store from './app/store/store';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterComponent />
        <Toaster position="bottom-right" reverseOrder={false} />
      </BrowserRouter>
    </Provider>
  );
}
