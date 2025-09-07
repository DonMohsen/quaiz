import { QuaizWithResults } from '@/types/quaiz.types'
import React from 'react'
import Modal from '../ui/Modal'
import { getTextDirection } from '@/lib/utils/getTextDirection'
type Props={
    quaizResults:QuaizWithResults
      onClose: () => void;

}
const QuaizResultsForm = ({quaizResults,onClose}:Props) => {
    
  return (
    <Modal onClose={onClose}>
      <div>
        <p>
          {quaizResults.user.firstName?`${quaizResults.user.firstName} ${quaizResults.user.lastName}`:quaizResults.user.userName}
        </p>
    {quaizResults.questions.map((q)=>(
      <div key={q.id} dir={getTextDirection(q.text)}>
        {q.text}
      </div>
    ))}
      </div>
    </Modal>
  )
}

export default QuaizResultsForm