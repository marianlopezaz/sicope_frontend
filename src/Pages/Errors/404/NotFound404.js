import React, { Component } from 'react';
import "./NotFound404.scss";
import { NavLink } from 'react-router-dom';

class NotFound404 extends Component {
    render() {
        return (
            <div>
                <p className="zoom-area">La página ingresada no existe!</p>
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
                <div className="link-container">
                    <NavLink to='/dashboard/estadisticas' className="more-link">Volver</NavLink>
                </div>
            </div>
        );
    }
}

export default NotFound404;