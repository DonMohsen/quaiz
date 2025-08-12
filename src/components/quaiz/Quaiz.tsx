import useQuaizStore from '@/store/quaizStore'
import React, { useState } from 'react'
import { Button } from '../ui/Button'

const Quaiz = () => {
  const [userAnswerState, setUserAnswerState] = useState<number | null>(null)
  const { currentQuestion, setCurrentQuestion, quaiz, setQuaiz } = useQuaizStore()

  if (!quaiz || currentQuestion === null) {
    return null
  }

  const handleUserAnswer = (isCorrect: boolean, index: number) => {
    if (userAnswerState !== null) return // prevent re-selecting
    setUserAnswerState(index)
  }

  const handleClick = () => {
    if (currentQuestion + 1 !== quaiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentQuestion + 1 === quaiz.questions.length) {
      setQuaiz(null)
      setCurrentQuestion(null)
    }
    setUserAnswerState(null) // reset for next question
  }

  const currentQ = quaiz.questions[currentQuestion]

 return (
  <div className="w-full h-full flex flex-col items-center justify-start relative">
    <p className="w-full text-center">
      {currentQuestion + 1}/{quaiz.questions.length}
    </p>

    <p dir="rtl">{quaiz.questions[currentQuestion].text}</p>

    <div className="flex items-center justify-center flex-col w-full gap-5">
      {quaiz.questions[currentQuestion].options.map((option, index) => (
      <div
  onClick={() => handleUserAnswer(option.isCorrect, index)}
  key={option.text}
  className={`w-full rounded-md px-3 py-4 text-right flex items-center justify-end gap-5 ${userAnswerState===null&&'cursor-pointer hover:bg-slate-200'}
    ${
      userAnswerState === null
        ? "bg-slate-300" // default before selection
        : option.isCorrect
        ? "bg-green-400"
        : index === userAnswerState
        ? "bg-red-400"
        : "bg-slate-300"
    }`}
>
  <p dir="rtl">{option.text}</p>
  <p className="p-2 rounded-[8px] bg-slate-100 w-10 h-10 text-center">
    {index + 1}
  </p>
</div>

      ))}
    </div>

    {/* <p>Answered: {userAnswerState?.toString()}</p> */}

    {/* Next button in bottom-right */}
    <div className="absolute bottom-4 right-4">
      <Button onClick={handleClick}>Next</Button>
    </div>
  </div>
)

}

export default Quaiz
