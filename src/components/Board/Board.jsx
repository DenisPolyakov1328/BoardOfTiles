import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkTiles,
  generateTiles,
  resetGame
} from './../../features/gameSlice'
import { generateTiles as generateRandomTiles } from './../../utils/generateTiles'
import Tile from './../Tile/Tile'

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
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <h1 className="text-7xl text-fuchsia-800 font-medium">YOU WIN</h1>
          <button
            className="mt-4 px-5 py-3 bg-fuchsia-600 hover:bg-fuchsia-800 text-white rounded-lg shadow-lg"
            onClick={handleReset}
          >
            RESTART
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <h1 className="text-7xl text-fuchsia-800 font-medium">
            Board of Tiles
          </h1>
          <div className="grid grid-cols-4 gap-2">
            {tiles.map((tile, index) => (
              <Tile key={tile.id} tile={tile} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Board
