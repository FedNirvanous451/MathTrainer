import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { LeaderboardEntry } from '../types'

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    api.getLeaderboard().then(setLeaders)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Таблица лидеров</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Место</th><th>Пользователь</th><th>Баллы</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((u, idx) => (
            <tr key={u.userId} className="border-b">
              <td className="p-2">{idx+1}</td><td>{u.name}</td><td>{u.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}