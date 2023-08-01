import React from 'react'
import { AnswerObject} from '../App'
import { styled } from 'styled-components';

type QuestionTypes = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
}

const QuestionCard:React.FC<QuestionTypes> = ({question,answers,callback,userAnswer}) => { 
    //React.FC tell typescript that this is a functional component.
    // put QuestionTypes in angle component to specify the types passing
    // destructure QuestionTypes.
   
  return (
    <Wrapper>
        <p className='question' dangerouslySetInnerHTML={{__html: question}} />
            {/* dangerouslySetInnerHTML is a React prop that allows you to set the content of a React 
            component as raw HTML. It is called "dangerously" because it bypasses React's 
            default behavior of escaping HTML entities and poses a potential security risk if used
            improperly. */}
        <div className='choices'>
            {answers.map((answer)=>(
                <div key={answer}>
                    <button type="button" disabled={!!userAnswer} value={answer} onClick={callback}>
                        {/* disabled={!!userAnswer} the !! will  convert userAnswer to boolean 
                            if undefine its false and has value its true */}
                        <span dangerouslySetInnerHTML={{__html: answer}}/>
                    </button>
                </div>
            ))}
        </div>
    </Wrapper>
  )
}
 const Wrapper = styled.div`
    padding: 0 3rem;
    .choices {
        padding-top: 2rem;
        text-align: center;
        
        button {
            padding: 1rem 20px;
            margin: .4rem auto;
            width: 100%;
            font-size: 16px;
            text-align: center;
            text-decoration: none;
            border: transparent; 
            background-color: #fdfdfd; 
            color: #383838; 
            border-radius: 4px; 
            cursor: pointer; 
            box-shadow: none; 
            transition: background-color 0.3s, color 0.3s;

            &:hover {
                background-color: #45a049; 
            }
            
            &:active {
                background-color: #3e8e41; 
            }
            &:disabled {
                background-color: #ffffffac;  
                cursor: not-allowed;
            }
            &:disabled:hover {
                background-color: #ffffffac; 
            }
        } 
    }
    @media (min-width: 776px) {
        .choices {
        padding: 2rem 10rem;
        }
  }
 `

export default QuestionCard