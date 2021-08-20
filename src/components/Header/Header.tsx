import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

export class Header extends Component {
    render() {
        return (
            <Navbar>
                <NavbarItem href="/owners">Автовладельцы</NavbarItem>
                <div className="navbar_item navbar__item_cars">
                    <NavbarItem href="/cars">Автомобили</NavbarItem>
                </div>
                <div className="navbar_item navbar__item_admin">
                    <NavbarItem href="/dashboard">Админ</NavbarItem>
                </div>
            </Navbar>
        );
    }
}

const Navbar = styled.nav`
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.8rem 2rem;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    & a {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        margin-right: 2rem;
        font-size: 2.5rem;
        line-height: inherit;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.9);
    }
`;

const NavbarItem = styled(Link)`
    // display: inline-block;
    // padding: 0.5rem 1.5rem;
    // margin-right: 2rem;
    // font-size: 2.5rem;
    // line-height: inherit;
    // white-space: nowrap;
    // color: rgba(0, 0, 0, 0.9);
`;

export default Header;
