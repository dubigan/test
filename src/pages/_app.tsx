import "../styles/app.scss";

import type { AppProps } from "next/app";
import { AlertProvider } from "../components/lib/alert/AlertContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <AlertProvider>
                <Component {...pageProps} />
            </AlertProvider>
        </Layout>
    );
}
export default MyApp;
