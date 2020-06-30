import React from "react";
import { FaDatabase, FaNetworkWired, FaLaptopCode, FaAlignJustify } from "react-icons/fa";
import history from "../../history";
import { Modal, Card, Button } from "../../components";
import "./subjects.scss";

const Subjects = () => {

    const onCardClick = (name) => {
        history.push(`/quiz/${name}`);
    };

    return (
        <main>
            <Modal title='choose a subject'>
                <div className="subjects__container">
                    <div className="subjects__row">
                        <Card text='Database Management System' icon={<FaDatabase />} onClick={() => onCardClick('dbms')} />
                        <Card text="Computer Networks" icon={<FaNetworkWired />} onClick={() => onCardClick('cn')} />
                    </div>
                    <div className="subjects__row">
                        <Card text="Operating Systems" icon={<FaLaptopCode />} onClick={() => onCardClick('os')} />
                        <Card text="Data Structure and Algorithms" icon={<FaAlignJustify />} onClick={() => onCardClick('dsa')} />
                    </div>
                    <div className="subjects__btn-container">
                        <Button onClick={() => history.push('/')}>Back</Button>
                    </div>
                </div>
            </Modal>
        </main>
    );
};

export default Subjects;