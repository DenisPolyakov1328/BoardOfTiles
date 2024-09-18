import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flipTile } from './../../features/gameSlice'
import clsx from 'clsx'
import star from './../../assets/png/star.png'

const Tile = ({ tile: { flipped, removed, image }, index }) => {
  const dispatch = useDispatch()
  const isChecking = useSelector((state) => state.game.isChecking)

  const handleClick = useCallback(() => {
    if (flipped || isChecking || removed) {
      return
    }
    dispatch(flipTile(index))
  }, [flipped, isChecking, removed, dispatch, index])

  const tileClass = clsx(
    'tile w-[100px] h-[100px] m-2 text-4xl flex justify-center items-center rounded cursor-pointer',
    flipped ? '' : 'bg-gray-300 shadow-lg',
    { invisible: removed }
  )

  return (
    <div className={tileClass} onClick={handleClick}>
      {!removed &&
        (flipped ? (
          <img
            src={image}
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
