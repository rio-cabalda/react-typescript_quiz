import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { Difficulty, fetchQuiz, QuestionState } from './utils/API';
import { styled } from 'styled-components';
import FinishModal from './components/FinishModal';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

function App() {
  const [isLoading, SetIsLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameFinish, setGameFinish] = useState(false)
  const [start,setStart] = useState(false)

  const startTrivia = async ()=>{
    SetIsLoading(true)
    setGameFinish(false)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setStart(true)
    try {
      const newQuestions = await fetchQuiz(TOTAL_QUESTIONS, Difficulty.MEDIUM)
      setQuestions(newQuestions)
      SetIsLoading(false)
    } catch (error) {
      console.log("start failed",error);
      SetIsLoading(false)
      
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameFinish){
      //user answer
      const answer = e.currentTarget.value

      //check the answer
      const correct = questions[number].correct_answer === answer
      
      // add score if answer is  correct
      if(correct) setScore((prev)=> prev + 1)

      //save the user answer into the array 
      const  AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      // add new object(answers of the users) to array
      setUserAnswers((prev)=> [...prev, AnswerObject])
    }else {
      alert('game finish')
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if(nextQuestion === TOTAL_QUESTIONS){
      // const timer = setTimeout(() => {
        setGameFinish(true) 
      // }, 2000);
      // return () => clearTimeout(timer);
      console.log('setGameFinish(true) ');
      
    }else{
      setNumber(nextQuestion)
    }
    console.log('nextQuestion',nextQuestion);
  }
console.log(gameFinish);

  return (<>
   {gameFinish && <FinishModal score={score} startTrivia= {startTrivia}/> }
   <Wrapper>
      <header className="header">
        <hr className='header-line'/>
        <div className="header-number">
          <p>
            <span>{start ? number+1 : 0}</span> /
            <span>{TOTAL_QUESTIONS}</span>
          </p>
        </div>
      </header>

      <div className="content">
        {start ? 
        <>
            {isLoading && <div className='start-menu'><div className='loading'></div></div>} 
            {!gameFinish && !isLoading && 
              <div className='main-menu'>
              <p className="score">Score:{score}</p>
                <QuestionCard 
                    question={questions[number].question}
                    answers={questions[number].answers}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={checkAnswer}
                    />
                <div className="next-container">
                {!gameFinish && !isLoading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS  ?
                  <button type='button' className='start' onClick={nextQuestion}>{number+1 === TOTAL_QUESTIONS? 'Show Result':'Next Question'}</button> :null
                }    
                </div>
              
              </div>
              }
        </>:
        <div className='start-menu'>
          <h2>Quiz App</h2>
            {!gameFinish || userAnswers.length === TOTAL_QUESTIONS ? 
                <button type='button' className='start' onClick={startTrivia}>Start</button> 
                : null} 
        </div>}
        
      </div>

      <footer>
      <hr/>
      <span>{start? 'Select all correct answers':'have fun!'}</span>
      </footer>
    </Wrapper>
  </>
  );
}

const Wrapper = styled.div`
  font-size: 2rem;
  width: 90vw;
  max-width: 60rem;
  margin: 2rem 2rem;
  color: white;

  .header{
    display: flex;
    column-gap: 1.5rem;

    &-line{
      border: none;
      border-top: 0.2rem solid #ffffff;
      flex-grow: 1;
      align-self: center;
    }
    &-number{
      font-size: 1.6rem;
      background: #ffffffda;
      padding: 0.2rem 1rem;
      text-align: center;
      border-radius: 1rem;
      color: #2a2a2a;
    }
  }

  .content {
    height: 40rem;
      .start-menu {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
          margin-top: 2rem;
        }
      }
      .main-menu {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        
      }
      .start { //button
        display: inline-block;
        padding: 0.6rem 5rem;
        font-size: 2rem;
        text-align: center;
        text-decoration: none;
        border: transparent;
        background-color: #4CAF50; 
        color: white; 
        border-radius: 4px; 
        cursor: pointer; 
        transition: background-color 200ms ease,
        box-shadow 200ms ease;

          &:hover {
            background-color: #45a049;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
          }
          &:active {
            background-color: #3e8e41; 
            box-shadow: none;
          }
      }

      .next-container {
        height: 3rem;


        button {
          font-size: 1.5rem;
          padding: 0.6rem 1rem;
        }
      }
  }

  footer{
    display: block;
    padding-top: 2rem;
    hr{
      border: none;
      border-top: 0.2rem solid #ffffff;
    }
    span {
      display: block;
      font-weight: 700;
      font-size: 1.6rem;
      text-align: center;
      line-height: 2;
      text-transform: uppercase;
    }
  }

  @media (min-width: 776px) {
    width: 90vw;
    max-width: 77rem;
  }
`;

export default App;
