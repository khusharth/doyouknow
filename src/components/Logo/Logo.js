import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Logo = ({ width }) => {

    return (
        <Link to="/">
            <div className='header__logo'>
                <img src={logo} alt='Logo' width={width} />
            </div>
        </Link>
    );
};

Logo.defaultProps = {
    width: "250px",
};

export default Logo;
