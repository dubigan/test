import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import '../styles/app.scss';

import type { AppProps } from 'next/app';
import { AlertProvider } from '../components/lib/alert/AlertContext';
import Layout from '../components/Layout';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        PageLayout?: React.ComponentType;
    };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
    return (
        <Layout>
            <AlertProvider>
                <Component {...pageProps} />
            </AlertProvider>
        </Layout>
    );
}
export default MyApp;
