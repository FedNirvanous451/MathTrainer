import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('test@test.com')
  const [password, setPassword] = useState('123')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/tasks')
    } catch (err) {
      setError('Неверный email или пароль')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Вход</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" className="border p-2 w-full mb-4" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">Войти</button>
      </form>
    </div>
  )
}