import React, { Component } from 'react';
export default class NavigationBar extends Component {
    render(){
        return(
            <nav className = "navbar" role = "navigation" aria-label = "main navigation">
                <div className = "navbar-brand">
                    <a className = "navbar-item" href = "/">
                        <img src = "gd.jpg" width = "170" height = "50" alt = "grid logo" />
                    </a>
                </div>

                <div id = "navbarBasicExample" className = "navbar-menu">
                    <div className = "navbar-start">
                        <a href = "/" className = "navbar-item">
                            Home
                        </a>
                        <a href = "/admin" className = "navbar-item">
                            Admin
                        </a>
                    </div>
                    

                    <div className = "navbar-end">
                        <div className = "navbar-item">
                            <div className = "buttons">
                                <a href = "/register" className = "button is-primary">
                                    <strong>
                                        Register
                                    </strong>
                                </a>
                                <a href = "/login" className = "button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}