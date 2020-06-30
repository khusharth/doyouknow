import React, { useState, useEffect, useContext } from "react";
import { GiTrophy, GiSandsOfTime, GiOpenBook } from "react-icons/gi";
import { Button } from "../../components";
import isEmpty from "../../utils/isEmpty";
import questionsFile from "../../utils/questions.json";
import correctSound from "../../assets/audio/correct.mp3"
import incorrectSound from "../../assets/audio/incorrect.mp3";
import history from "../../history";
import { UserContext } from "../../context/userContext";
import "./quiz.scss";


const Quiz = (props) => {
    const [subject, setSubject] = useState(props.match.params.subject);
    const [questions, setQuestions] = useState(questionsFile.dbms);
    const [currentQues, setCurrentQues] = useState({});
    const [nextQues, setNextQues] = useState({});
    const [prevQues, setPrevQues] = useState({});
    const [answer, setAnswer] = useState('');
    const [totalQues, setTotalQues] = useState(0);
    const [totalAnsweredQues, setTotalAnsweredQues] = useState(0);
    const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAns] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [seconds, setSeconds] = useState(60);
    const [isRunning, setIsRunning] = useState(true);
    const [intervalId, setIntervalId] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [nextBtnDisabled, setnextBtnDisabled] = useState(false);
    const [prevBtnDisabled, setprevBtnDisabled] = useState(true);
    const [endGame, setEndGame] = useState(false);

    const { username } = useContext(UserContext);

    const playAgain = () => {
        setCurrentQues({});
        setNextQues({});
        setPrevQues({});
        setAnswer('');
        setTotalQues(0);
        setTotalAnsweredQues(0);
        setScore(0);
        setCorrectAns(0);
        setWrongAnswers(0);
        setSeconds(60);
        setIsRunning(true);
        setnextBtnDisabled(false);
        setprevBtnDisabled(true);
        setEndGame(false);
        setCurrentQuesIndex(0);
        displayQues(questions, currentQues, nextQues, prevQues);
    }

    console.log(questions);

    const init = () => {
        let sub = props.match.params.subject;
        if (sub === "dbms") {
            setQuestions(questionsFile.dbms);

            setSubject("Database Management System");
        } else if (sub === "cn") {
            // console.log(questionsFile.cn);
            setQuestions(questionsFile.cn);
            setSubject("Computer Networks")
        } else if (sub === "dsa") {
            setQuestions(questionsFile.dsa);
            setSubject("Data Structures and Algorithm");
        } else {
            console.log(subject);
            setQuestions(questionsFile.os);
            setSubject("Operating system");
        }
    };

    const displayQues = (ques = questions, currQuestion, nextQuestion, prevQuestion) => {

        if (!isEmpty(questions)) {
            ques = questions;
            currQuestion = ques[currentQuesIndex];
            nextQuestion = ques[currentQuesIndex + 1];
            prevQuestion = ques[currentQuesIndex - 1];
            const answer = currQuestion.answer;

            setCurrentQues(questions[currentQuesIndex]);
            setNextQues(nextQuestion);
            setPrevQues(prevQuestion);
            setAnswer(answer);
            setTotalQues(questions.length);
        }
    };

    const handleOptionClick = (e, clickedAns) => {
        let selectedChoice = e.target;
        if (clickedAns === answer) {
            setDisabled(true);
            setTimeout(() => {
                document.getElementById('correct-sound').play();
            }, 500);

            selectedChoice.parentElement.classList.add('correct');
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove('correct');
                setDisabled(false);
            }, 1500);
            correctAnswer();
        } else {
            setDisabled(true);
            setTimeout(() => {
                document.getElementById('incorrect-sound').play();
            }, 500);
            selectedChoice.parentElement.classList.add('incorrect');
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove('incorrect');
                setDisabled(false);
            }, 1500);
            wrongAnswer();
        }

    };

    const correctAnswer = () => {
        setScore(prevState => prevState + 1);
        setCorrectAns(prevState => prevState + 1);
        setTotalAnsweredQues(prevState => prevState + 1);

        if (nextQues === undefined) {
            setTimeout(() => {
                setEndGame(true);
                setIsRunning(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setCurrentQuesIndex(prevState => prevState + 1);
            }, 1500);
        }
    };

    const wrongAnswer = () => {
        // navigator.vibrate(1000);
        setWrongAnswers(prevState => prevState + 1);
        setTotalAnsweredQues(prevState => prevState + 1);

        if (nextQues === undefined) {
            setTimeout(() => {
                setEndGame(true);
                setIsRunning(false);
            }, 1000);
        } else {
            setTimeout(() => {
                setCurrentQuesIndex(prevState => prevState + 1);
            }, 1500);
        }
    }

    const handleNextClick = () => {
        if (nextQues !== undefined) {
            setCurrentQuesIndex(prevState => prevState + 1);
        }
    };

    const handlePrevClick = () => {
        if (prevQues !== undefined) {
            setCurrentQuesIndex(prevState => prevState - 1);
        }
    };

    const handlePrevDisableBtn = () => {
        if (prevQues === undefined || currentQuesIndex === 0) {
            setprevBtnDisabled(true);
        } else {
            setprevBtnDisabled(false);
        }
    };

    const handleNextDisableBtn = () => {
        if (nextQues === undefined || currentQuesIndex + 1 === totalQues) {
            setnextBtnDisabled(true);
        } else {
            setnextBtnDisabled(false);
        }
    };

    useEffect(() => {
        init();
        displayQues(questions, currentQues, nextQues, prevQues);
    }, [questions]);

    useEffect(() => {
        displayQues(questions, currentQues, nextQues, prevQues);
    }, [currentQuesIndex]);

    useEffect(() => {
        handlePrevDisableBtn();
    }, [prevQues]);

    useEffect(() => {
        handleNextDisableBtn();
    }, [nextQues])



    useEffect(() => {
        // console.log(isRunning);
        if (isRunning) {
            const id = window.setInterval(
                () => setSeconds((seconds) => seconds - 1),
                1000
            );
            setIntervalId(id);
        } else {
            // Clear set Interval
            window.clearInterval(intervalId);
        }
    }, [isRunning]);

    useEffect(() => {
        if (totalAnsweredQues === questions.length) {
            setTimeout(() => {
                setEndGame(true);
                setIsRunning(false);
            }, 1000);
            // alert('done');
        }
        // alert('done');

    }, [totalAnsweredQues]);

    useEffect(() => {
        if (seconds === 0) {
            setIsRunning(false);
            setEndGame(true);
            // alert('done');
        }
    }, [seconds]);



    return (
        <main className="quiz__container">
            <>
                <audio id="correct-sound" src={correctSound} ></audio>
                <audio id="incorrect-sound" src={incorrectSound} ></audio>
            </>
            <div className="quiz__board">
                <div className="quiz__title">{endGame ? "Quiz Over" : subject}</div>
                {!endGame ?
                    <>
                        <div className="quiz__stats">
                            <div className="quiz__progress"><GiOpenBook /> {currentQuesIndex + 1}/{totalQues}</div>
                            <div className="quiz__timer"> <GiSandsOfTime /> {seconds} sec</div>
                        </div>
                        <div className="quiz__content">
                            <div className="quiz__question">
                                {currentQues.question}
                            </div>
                            <div className="quiz__options">
                                <div className="quiz__option" onClick={(disabled) ? null : (e) => handleOptionClick(e, currentQues.optionA)}>
                                    <span className="quiz__bullet">A</span>
                                    <span className="quiz__text">{currentQues.optionA}</span>
                                </div>
                                <div className="quiz__option" onClick={(disabled) ? null : (e) => handleOptionClick(e, currentQues.optionB)}>
                                    <div className="quiz__bullet">B</div>
                                    <div className="quiz__text">{currentQues.optionB}</div>
                                </div>
                                <div className="quiz__option" onClick={(disabled) ? null : (e) => handleOptionClick(e, currentQues.optionC)}>
                                    <span className="quiz__bullet">C</span>
                                    <span className="quiz__text">{currentQues.optionC}</span>
                                </div>
                                <div className="quiz__option" onClick={(disabled) ? null : (e) => handleOptionClick(e, currentQues.optionD)}>
                                    <span className="quiz__bullet">D</span>
                                    <span className="quiz__text">{currentQues.optionD}</span>
                                </div>
                            </div>
                        </div>
                        <div className="quiz__btn-container">
                            {/* <Button disabled={prevBtnDisabled} onClick={handlePrevClick}>Prev</Button> */}
                            <Button disabled={nextBtnDisabled} onClick={handleNextClick}>Skip</Button>
                        </div>
                    </>
                    :
                    <>
                        <div className="summary__container">
                            <div className="summary__title"> <GiTrophy /> Congrats {username}! You made it.</div>
                            <div className="summary__line">{(score < 7) ? 'You can do better' : ''}</div>
                            <div className="summary__score">Score: {(score / totalQues) * 100}%</div>
                            <div className="summary__total-container">
                                <div className="summary__total">
                                    <div className="summary__stats">
                                        <div>Total Questions:</div>
                                        <div>Questions Attempted:</div>
                                        <div>Correct Answers:</div>
                                        <div>Wrong Answers:</div>
                                    </div>
                                    <div className="summary__stats">
                                        <div>{totalQues}</div>
                                        <div>{totalAnsweredQues}</div>
                                        <div>{correctAnswers}</div>
                                        <div>{wrongAnswers}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="summary__btn-container">
                                <div className="summary__btn-centered">
                                    <Button onClick={() => history.push('/subjects')} marginTop="1.5rem">Back</Button>
                                    <Button onClick={playAgain}>Play Again</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </main>
    );
};

export default Quiz;