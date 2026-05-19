import { useState } from 'react'
import { Task, SolveResult } from '../types'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

interface Props {
  task: Task
  onSolve: (answer: string) => void
  result: SolveResult | null
}

export default function TaskCard({ task, onSolve, result }: Props) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    if (!answer.trim()) return
    onSolve(answer)
    setAnswer('')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-lg font-medium mb-2">
        <InlineMath math={task.question} />
      </div>
      <input
        type="text"
        placeholder="Ваш ответ"
        className="border p-2 w-full mb-4"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={!!result && result.correct}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!!result && result.correct}
      >
        Проверить
      </button>
      {result && (
        <div className={`mt-4 p-2 rounded ${result.correct ? 'bg-green-100' : 'bg-red-100'}`}>
          {result.message}
        </div>
      )}
    </div>
  )
}