import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/style.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer />
        </Provider>
    );
}