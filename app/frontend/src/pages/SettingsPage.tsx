import { useState } from 'react'
import { api } from '../api/client'

export default function SettingsPage() {
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [msg, setMsg] = useState('')

  const handleChangePassword = async () => {
    try {
      await api.changePassword(oldPwd, newPwd)
      setMsg('Пароль изменён')
      setOldPwd(''); setNewPwd('')
    } catch {
      setMsg('Ошибка')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Настройки</h2>
      <div className="mb-4">
        <input type="password" placeholder="Старый пароль" className="border p-2 w-full mb-2" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
        <input type="password" placeholder="Новый пароль" className="border p-2 w-full mb-2" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
        <button onClick={handleChangePassword} className="bg-blue-500 text-white p-2 rounded">Сменить пароль</button>
        {msg && <p className="mt-2 text-green-600">{msg}</p>}
      </div>
    </div>
  )
}