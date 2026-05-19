import type { Task, SolveResult, UserStats, LeaderboardEntry } from '../types'

// Имитация задержки сети
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

// Моковые задачи
const mockTasks: Task[] = [
  { id: 1, question: '2x + 5 = 15', answer: '5', topic: 'algebra', difficulty: 'easy', explanation: 'Вычтите 5 из обеих частей, затем разделите на 2.' },
  { id: 2, question: 'x² = 16', answer: '4', topic: 'algebra', difficulty: 'easy', explanation: 'Корень из 16 равен 4, также подходит -4, но в тренажёре пока принимаем 4.' },
  { id: 3, question: 'Решите уравнение: 3(x - 4) = 2x + 1', answer: '13', topic: 'algebra', difficulty: 'medium', explanation: 'Раскройте скобки: 3x-12=2x+1 -> x=13' },
]

let currentUser: { id: number; email: string; token: string } | null = null
let userPoints = 120   // для примера

// Имитация API
export const api = {
  // Auth
  register: async (email: string, password: string) => {
    await delay(500)
    if (email && password) {
      return { token: 'mock-jwt-token', user: { id: 1, email } }
    }
    throw new Error('Registration failed')
  },
  login: async (email: string, password: string) => {
    await delay(500)
    if (email === 'test@test.com' && password === '123') {
      currentUser = { id: 1, email, token: 'mock-jwt-token' }
      return { token: 'mock-jwt-token', user: { id: 1, email } }
    }
    throw new Error('Invalid credentials')
  },
  getTasks: async (topic?: string, difficulty?: string): Promise<Task[]> => {
    await delay(300)
    let tasks = [...mockTasks]
    if (topic) tasks = tasks.filter(t => t.topic === topic)
    if (difficulty) tasks = tasks.filter(t => t.difficulty === difficulty)
    return tasks
  },
  solveTask: async (taskId: number, answer: string): Promise<SolveResult> => {
    await delay(500)
    const task = mockTasks.find(t => t.id === taskId)
    if (!task) throw new Error('Task not found')
    const isCorrect = task.answer === answer.trim()
    if (isCorrect) {
      userPoints += 10
      return { correct: true, message: 'Верно! +10 баллов', pointsEarned: 10 }
    } else {
      return { correct: false, message: `Неверно. ${task.explanation || 'Попробуйте ещё.'}`, correctAnswer: task.answer }
    }
  },
  getUserStats: async (): Promise<UserStats> => {
    await delay(300)
    return {
      totalSolved: 42,
      correctPercent: 78,
      totalPoints: userPoints,
      tasksByTopic: { algebra: 30, geometry: 12 },
      dailyActivity: [
        { date: '2025-04-20', count: 5 },
        { date: '2025-04-21', count: 8 },
        { date: '2025-04-22', count: 6 }
      ]
    }
  },
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    await delay(300)
    return [
      { userId: 1, name: 'alex@math', score: 450 },
      { userId: 2, name: 'student1', score: 320 },
      { userId: 3, name: 'math_lover', score: 280 }
    ]
  },
  changePassword: async (oldPwd: string, newPwd: string) => {
    await delay(500)
    if (oldPwd === '123') return { success: true }
    throw new Error('Wrong old password')
  }
}