import React from "react";
import "./Button.scss";

const Button = ({ children, onClick, marginTop, disabled, type }) => {
    return (
        <button
            style={{ marginTop: `${marginTop}` }}
            onClick={onClick}
            className='btn--primary'
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

Button.defaultProps = {
    disabled: false,
    type: 'button'
};

export default Button;
