import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tiles: [], // Массив плиток
  firstTile: null, // Первая выбранная плитка
  secondTile: null, // Вторая выбранная плитка
  moves: 0, // Количество ходов
  matchedTiles: 0, // Количество совпавших пар
  gameOver: false, // Статус завершения игры
  isChecking: false // Флаг для блокировки кликов во время проверки плиток
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Генерация плиток
    generateTiles(state, action) {
      state.tiles = action.payload
      state.matchedTiles = 0
      state.moves = 0
      state.firstTile = null
      state.secondTile = null
      state.gameOver = false
      state.isChecking = false
    },

    flipTile(state, action) {
      const tileIndex = action.payload

      // Если плитка уже перевернута, не позволяем ее повторно выбрать
      if (state.tiles[tileIndex].flipped) {
        return
      }

      // Если еще не выбрана первая плитка
      if (state.firstTile === null) {
        state.firstTile = tileIndex
        state.tiles[tileIndex].flipped = true
      } else if (state.secondTile === null) {
        // Если первая плитка уже выбрана, устанавливаем вторую плитку
        state.secondTile = tileIndex
        state.tiles[tileIndex].flipped = true

        // Начинаем процесс проверки плиток (блокируем клики)
        state.isChecking = true
      }
    },

    checkTiles(state) {
      if (state.firstTile !== null && state.secondTile !== null) {
        const firstTileIndex = state.firstTile
        const secondTileIndex = state.secondTile
        const firstTile = state.tiles[firstTileIndex]
        const secondTile = state.tiles[secondTileIndex]

        if (firstTile.color === secondTile.color) {
          // Если плитки совпали, они должны исчезнуть
          state.tiles[firstTileIndex].removed = true
          state.tiles[secondTileIndex].removed = true
          // Если плитки совпали, они остаются открытыми
          state.matchedTiles += 2

          // Проверка завершения игры
          if (state.matchedTiles === state.tiles.length) {
            state.gameOver = true
          }
        } else {
          // Если плитки не совпали, закрываем их
          state.tiles = state.tiles.map((tile, index) => {
            if (index === firstTileIndex || index === secondTileIndex) {
              return { ...tile, flipped: false }
            }
            return tile
          })
        }

        // Сбрасываем выбранные плитки
        state.firstTile = null
        state.secondTile = null
        state.isChecking = false // Разблокируем клики
      }
    },

    // Перезапуск игры
    resetGame(state) {
      state.tiles = []
      state.firstTile = null
      state.secondTile = null
      state.moves = 0
      state.matchedTiles = 0
      state.gameOver = false
      state.isChecking = false
    }
  }
})

export const { generateTiles, flipTile, checkTiles, resetGame } =
  gameSlice.actions
export default gameSlice.reducer
