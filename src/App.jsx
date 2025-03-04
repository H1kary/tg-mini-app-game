import { useState, useEffect } from 'react'
import { supabase } from './config/supabase'
import './App.css'

function App() {
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('')
  const [telegramWebApp, setTelegramWebApp] = useState(null)

  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.expand()
      setTelegramWebApp(tg)
    }
  }, [])

  const saveUserToSupabase = async (userData) => {
    try {
      // Проверяем, существует ли пользователь
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', userData.id)
        .single()

      // Если ошибка не связана с отсутствием записи (PGRST116), выбрасываем её
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      if (existingUser) {
        // Обновляем существующего пользователя
        const { error } = await supabase
          .from('users')
          .update({
            username: userData.username || null,
            first_name: userData.first_name,
            last_name: userData.last_name || null,
            last_login: new Date()
          })
          .eq('telegram_id', userData.id)

        if (error) throw error
        return { success: true, message: 'Пользователь обновлен', user: existingUser }
      } else {
        try {
          // Создаем нового пользователя
          const { data, error } = await supabase
            .from('users')
            .insert([
              {
                telegram_id: userData.id,
                username: userData.username || null,
                first_name: userData.first_name,
                last_name: userData.last_name || null,
                created_at: new Date(),
                last_login: new Date()
              }
            ])
            .select()

          if (error) throw error
          return { success: true, message: 'Пользователь создан', isNew: true }
        } catch (insertError) {
          // Если ошибка связана с дублированием telegram_id, попробуем обновить пользователя
          if (insertError.message?.includes('users_telegram_id_key')) {
            // Повторно получаем пользователя
            const { data: user, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('telegram_id', userData.id)
              .single()
            
            if (userError) throw userError
            
            // Обновляем пользователя
            const { error } = await supabase
              .from('users')
              .update({
                username: userData.username || null,
                first_name: userData.first_name,
                last_name: userData.last_name || null,
                last_login: new Date()
              })
              .eq('telegram_id', userData.id)
            
            if (error) throw error
            return { success: true, message: 'Пользователь обновлен', user }
          }
          throw insertError
        }
      }
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error)
      return { success: false, message: 'Ошибка при сохранении: ' + error.message }
    }
  }

  const handleStartGame = async () => {
    try {
      const user = telegramWebApp?.initDataUnsafe?.user
      
      if (!user || !user.id) {
        throw new Error('Не удалось получить данные пользователя Telegram. Убедитесь, что вы открыли приложение через Telegram.')
      }
      
      const result = await saveUserToSupabase(user)
      
      if (result.success) {
        setStatus(result.isNew ? 'Добро пожаловать! Ваш профиль создан.' : 'С возвращением! Ваш профиль обновлен.')
        setStatusType('success')
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Ошибка:', error)
      setStatus('Ошибка: ' + error.message)
      setStatusType('error')
    }
  }

  return (
    <div className="container">
      <h1>Telegram Game</h1>
      <p>Добро пожаловать в игру!</p>
      <button onClick={handleStartGame}>Начать игру</button>
      {status && (
        <div className={`status ${statusType}`}>
          {status}
        </div>
      )}
    </div>
  )
}

export default App
