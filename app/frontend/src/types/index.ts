export interface User {
  id: number
  email: string
  name?: string
}

export interface Task {
  id: number
  question: string
  answer: string          // правильный ответ (для мока)
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  explanation?: string
}

export interface SolveResult {
  correct: boolean
  message: string
  correctAnswer?: string
  pointsEarned?: number
}

export interface LeaderboardEntry {
  userId: number
  name: string
  score: number
}

export interface UserStats {
  totalSolved: number
  correctPercent: number
  totalPoints: number
  tasksByTopic: Record<string, number>
  dailyActivity: { date: string; count: number }[]
}