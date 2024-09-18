import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flipTile } from './../../features/gameSlice'
import star from './../../assets/png/star.png'

const Tile = ({ tile, index }) => {
  const dispatch = useDispatch()
  const isChecking = useSelector((state) => state.game.isChecking)

  const handleClick = () => {
    if (tile.flipped || isChecking || tile.removed) {
      return
    }
    dispatch(flipTile(index))
  }

  return (
    <div
      className={`tile w-[100px] h-[100px] m-2 text-4xl flex justify-center items-center rounded cursor-pointer 
      ${tile.flipped ? 'bg-' + tile.color : 'bg-gray-300 shadow-lg'}
      ${tile.removed ? 'invisible' : ''}`} // Если плитка удалена, добавляем класс invisible
      onClick={handleClick}
    >
      {!tile.removed &&
        (tile.flipped ? (
          <img
            src={tile.color}
            alt="tile"
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={star}
            alt="star"
            className="w-[64px] h-[64px] object-contain"
          />
        ))}
    </div>
  )
}

export default Tile
