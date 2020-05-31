
import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        if (window.innerWidth < 500) {
            return (

                <div>
                    <h1 className="smallerHeaderTitle" style={{ display: "flex", justifyContent: "center" }}>Welcome to Thomas Jefferson Elementary!</h1>
                </div>

            );
        } else {
            return (

                <div className="Header_root">
                    <h1 className="Header_title" style={{ display: "flex", justifyContent: "center" }}>Welcome to Thomas Jefferson Elementary!</h1>
                </div>

            );
        }
    }
}

export default Header;