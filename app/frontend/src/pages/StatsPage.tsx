import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Временные моки — без api
const mockStats = {
  totalSolved: 42,
  correctPercent: 78,
  totalPoints: 120,
  dailyActivity: [
    { date: '2025-04-20', count: 5 },
    { date: '2025-04-21', count: 8 },
    { date: '2025-04-22', count: 6 }
  ]
}

export default function StatsPage() {
  const [stats, setStats] = useState(mockStats)

  const data = {
    labels: stats.dailyActivity.map(d => d.date),
    datasets: [{ label: 'Решено задач', data: stats.dailyActivity.map(d => d.count), backgroundColor: '#3b82f6' }]
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Моя статистика</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Решено: {stats.totalSolved}</div>
        <div className="bg-white p-4 rounded shadow">Точность: {stats.correctPercent}%</div>
        <div className="bg-white p-4 rounded shadow">Баллов: {stats.totalPoints}</div>
      </div>
      <Bar data={data} />
    </div>
  )
}