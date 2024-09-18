import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './features/gameSlice'

const store = configureStore({
  reducer: {
    game: gameReducer // Подключаем редьюсер game из gameSlice
  }
})

export default store
