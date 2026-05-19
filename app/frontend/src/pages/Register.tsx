import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(email, password)
      navigate('/tasks')
    } catch {
      setError('Ошибка регистрации')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" className="border p-2 w-full mb-4" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">Зарегистрироваться</button>
      </form>
    </div>
  )
}