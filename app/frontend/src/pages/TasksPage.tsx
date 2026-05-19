import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Task, SolveResult } from '../types'
import TaskCard from '../components/TaskCard'

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [result, setResult] = useState<SolveResult | null>(null)
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    api.getTasks(topic || undefined, difficulty || undefined).then(setTasks)
  }, [topic, difficulty])

  const currentTask = tasks[currentIndex]

  const onSolve = async (answer: string) => {
    if (!currentTask) return
    const res = await api.solveTask(currentTask.id, answer)
    setResult(res)
    if (res.correct) {
      setTimeout(() => {
        setResult(null)
        if (currentIndex + 1 < tasks.length) setCurrentIndex(i => i + 1)
      }, 1500)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-4 mb-4">
        <select className="border p-2" value={topic} onChange={e => setTopic(e.target.value)}>
          <option value="">Все темы</option>
          <option value="algebra">Алгебра</option>
          <option value="geometry">Геометрия</option>
        </select>
        <select className="border p-2" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="">Любая сложность</option>
          <option value="easy">Лёгкая</option>
          <option value="medium">Средняя</option>
        </select>
      </div>
      {currentTask && (
        <TaskCard task={currentTask} onSolve={onSolve} result={result} />
      )}
      {tasks.length === 0 && <p>Нет задач</p>}
    </div>
  )
}