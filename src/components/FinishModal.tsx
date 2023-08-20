import React from 'react'
import { styled } from 'styled-components';



interface childprops {
    score:number;
    startTrivia: ()=>void ;
}


// :React.FC<UserAnswerObject>
const FinishModal:React.FC<childprops> = ({score,startTrivia}) => {
  return (
    <Wrapper>
      <div className='modal'>
        <h4>Here's the result:</h4>
        <div className="result">
            <p>score: {score}</p>
        </div>
        <div className='btn-container'>
          <button type='button' onClick={startTrivia}>
            start quiz
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    .modal {
        background: white;
        min-height: 35rem;
        height: 20rem;
        width: 80vw;
        max-width: 400px;
        border-radius: 2rem;
        padding: 2rem 1rem;
        padding-top: 4rem;
        font-size: 2.5rem;
        text-align: center;

        @media (min-width: 776px) {
            height: 40rem;
        }

        & h4 {
            margin-bottom: 0;
            line-height: 1.5;
            }
        & .result{
            padding: 2rem 0;
            text-transform: capitalize;
        }
        & .clear-btn,
        & .confirm-btn {
            margin-top: 1rem;
            }    
        }
    
    .btn-container {
        padding-top: 4rem;
    }
    button { //button
        display: inline-block;
        padding: 0.6rem 5rem;
        font-size: 2rem;
        text-align: center;
        text-decoration: none;
        text-transform: capitalize;
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
`

export default FinishModal

