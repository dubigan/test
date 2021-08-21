import React from "react";
import Header from "./Header/Header";

type TLayoutProps = { children: React.ReactNode };
const Layout = ({ children }: TLayoutProps) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Layout;
