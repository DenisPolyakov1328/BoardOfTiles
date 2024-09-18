import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkTiles,
  generateTiles,
  resetGame
} from './../../features/gameSlice'
import { generateTiles as generateRandomTiles } from './../../utils/generateTiles'
import GameOverScreen from './GameOverScreen/GameOverScreen'
import TileGrid from './TileGrid/TileGrid'

const Board = () => {
  const dispatch = useDispatch()
  const { tiles, firstTile, secondTile, gameOver } = useSelector(
    (state) => state.game
  )

  // Генерация плиток при загрузке компонента
  useEffect(() => {
    const newTiles = generateRandomTiles() // Логика для генерации плиток
    dispatch(generateTiles(newTiles))
  }, [dispatch])

  // Проверка плиток, когда выбраны две
  useEffect(() => {
    if (firstTile !== null && secondTile !== null) {
      // Добавляем задержку перед проверкой
      const timer = setTimeout(() => {
        dispatch(checkTiles())
      }, 1000)

      return () => clearTimeout(timer) // Очищаем таймер, если компонент размонтируется
    }
  }, [firstTile, secondTile, dispatch])

  const handleReset = () => {
    const newTiles = generateRandomTiles()
    dispatch(resetGame())
    dispatch(generateTiles(newTiles))
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {gameOver ? (
        <GameOverScreen onReset={handleReset} />
      ) : (
        <TileGrid tiles={tiles} />
      )}
    </div>
  )
}

export default Board
