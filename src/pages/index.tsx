import React from "react";
import { Header } from "../components/Header/Header";
import { AlertProvider } from "../components/lib/alert/AlertContext";
// import OneSignal, { useOneSignalSetup } from 'react-onesignal';

const App = () => {
    // const oneSignal = (window as any).OneSignal || [];
    // console.log('App.OneSignal.oneSignal', oneSignal);
    // useEffect(() => {
    //   oneSignal.push(function () {
    //     oneSignal.init({
    //       appId: '4c631ec8-c487-486c-a57f-032561cf353e',
    //       notifyButton: {
    //         enable: true,
    //       },
    //       allowLocalhostAsSecureOrigin: true,
    //     });
    //   });
    //   oneSignal.push(() => {
    //     oneSignal.showNativePrompt();
    //   });
    //   oneSignal.push(() => {
    //     oneSignal.on('subscriptionChange', (isSubscribed: any) => {
    //       console.log('subscription state', isSubscribed);
    //       oneSignal.push(() => {
    //         oneSignal.getUserId((userId: any) => {
    //           console.log('userId', userId);
    //         });
    //       });
    //     });
    //   });
    // }, []);

    return (
        <>
            {/* <Header /> */}
            {/* <div className="container-fluid">
            </div> */}
        </>
    );
};

export default App;
