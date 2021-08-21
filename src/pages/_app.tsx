import "../styles/app.scss";

import type { AppProps } from "next/app";
import { AlertProvider } from "../components/lib/alert/AlertContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AlertProvider>
            <Component {...pageProps} />
        </AlertProvider>
    );
}
export default MyApp;
