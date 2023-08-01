import { shuffleQuestion } from "./helpers";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {answers: string[]}

export enum Difficulty {
    EASY= 'easy',
    MEDIUM= 'medium',
    HARD= 'hard',
}

export const fetchQuiz = async (amount: number, difficulty: Difficulty) =>{
        const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`
        const response = await fetch(endpoint)
        const data = await response.json()
        
        return data.results.map((question: Question) =>(
            {...question,
            answers: shuffleQuestion([...question.incorrect_answers, question.correct_answer])
        
            }
        ))
    }