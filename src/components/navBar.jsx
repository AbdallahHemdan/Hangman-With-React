import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <a
                    className="navbar-brand text-light"
                    href="https://github.com/AbdallahHemdan"
                    target="_black"
                >
                    Abdallah Hemdan. <span className="try-or-die"><small>Try (or) Die</small></span>
                </a>
                <div className="collapse navbar-collapse" id="navbarText">
                    <span className="noOfWrongs">
                        # wrong guesses: {this.props.mistake}
                    </span>
                </div>
            </nav>
        );
    }
}

export default NavBar;