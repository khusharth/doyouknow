import React from "react";
import "./card.scss";

const Card = ({ icon, text, onClick }) => {
    return (
        <div className="card" onClick={onClick} >
            <div className="card__icon">{icon}</div>
            <div className="card__text">{text}</div>
        </div>
    );
};

export default Card;
