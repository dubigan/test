import React, { Component } from "react";
import Link from "next/link";

export class Header extends Component {
    render() {
        return (
            <nav className="navbar">
                {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
                {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo01"> */}
                <div className="navbar_item">
                    <Link href="/owners">Автовладельцы</Link>
                </div>
                <div className="navbar_item navbar__item_cars">
                    <Link href="/cars">Автомобили</Link>
                </div>
                <div className="navbar_item navbar__item_admin">
                    <Link href="/dashboard">Админ</Link>
                </div>
                {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul> */}
                {/* </div> */}
            </nav>
        );
    }
}

export default Header;
