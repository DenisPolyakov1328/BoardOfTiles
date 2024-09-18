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

      if (state.tiles[tileIndex].flipped || state.isChecking) {
        return
      }

      if (state.firstTile === null) {
        state.firstTile = tileIndex
        state.tiles[tileIndex].flipped = true
      } else if (state.secondTile === null) {
        state.secondTile = tileIndex
        state.tiles[tileIndex].flipped = true
        state.isChecking = true
        state.moves += 1 // Увеличиваем количество ходов
      }
    },

    checkTiles(state) {
      const { firstTile, secondTile } = state

      if (firstTile !== null && secondTile !== null) {
        const firstTileIndex = firstTile
        const secondTileIndex = secondTile
        const firstTileData = state.tiles[firstTileIndex]
        const secondTileData = state.tiles[secondTileIndex]

        if (firstTileData.image === secondTileData.image) {
          state.tiles[firstTileIndex].removed = true
          state.tiles[secondTileIndex].removed = true
          state.matchedTiles += 2

          if (state.matchedTiles === state.tiles.length) {
            state.gameOver = true
          }
        } else {
          state.tiles = state.tiles.map((tile, index) =>
            index === firstTileIndex || index === secondTileIndex
              ? { ...tile, flipped: false }
              : tile
          )
        }

        state.firstTile = null
        state.secondTile = null
        state.isChecking = false
      }
    },

    resetGame(state) {
      Object.assign(state, initialState) // Сброс состояния к начальному
    }
  }
})

export const { generateTiles, flipTile, checkTiles, resetGame } =
  gameSlice.actions
export default gameSlice.reducer
