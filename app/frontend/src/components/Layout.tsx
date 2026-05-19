import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">MathTrainer</Link>
        {user ? (
          <div className="space-x-4">
            <Link to="/tasks" className="hover:text-blue-600">Задачи</Link>
            <Link to="/stats" className="hover:text-blue-600">Статистика</Link>
            <Link to="/leaderboard" className="hover:text-blue-600">Рейтинг</Link>
            <Link to="/settings" className="hover:text-blue-600">Настройки</Link>
            <button onClick={handleLogout} className="text-red-500">Выйти</button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </div>
        )}
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}