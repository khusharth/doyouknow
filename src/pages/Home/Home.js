import React, { useState, useContext } from "react";
import history from "../../history";
import { Modal, Button } from "../../components";
import { UserContext } from "../../context/userContext";
import "./home.scss";

const Home = () => {
    const { username, setUsername } = useContext(UserContext);

    const onUserChange = (e) => {
        const updatedUser = e.target.value;
        setUsername(updatedUser);
    };

    const onFromSubmit = (e) => {
        e.preventDefault();
        history.push('/subjects');
    };

    return (
        <main>
            <Modal title='Welcome'>
                <form className="form" onSubmit={onFromSubmit}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form__input"
                        placeholder="Enter Username"
                        value={username}
                        onChange={onUserChange}
                    />
                    <Button type="submit" marginTop="3rem" disabled={!username}>
                        Start Quiz
                    </Button>
                </form>

                {/* <Button
                    marginTop='1.5rem'
                    onClick={() => history.push("/instructions")}>
                    Highscore
                </Button> */}
            </Modal>
        </main>
    );
};

export default Home;