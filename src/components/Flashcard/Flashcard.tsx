import useFlashcardsStore from '@/store/flashcardsStore'
import React from 'react'
import { Button } from '../ui/Button'

const Flashcard = () => {
    const{currentFlashcard,flashcards,setCurrentFlashcard,setFlashcards}=useFlashcardsStore()
    if (currentFlashcard===null||!flashcards) {
        return <p>Not found</p>
    }
      const currentF = flashcards[currentFlashcard];

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative">
      <p className="w-full text-center bg-red-400">
        {currentFlashcard + 1}/{flashcards.length}
      </p>

      <p dir="rtl">{currentF.title}</p>

     
      {/* Next / Finish button */}
   

      {/* Save progress button */}
     
    </div>
  )
}

export default Flashcard