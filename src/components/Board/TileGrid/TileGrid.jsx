import React from 'react'
import Tile from './../../Tile/Tile'
import Title from './../../Title/Title'

const TileGrid = ({ tiles }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <Title>Board of Tiles</Title>
      <div className="grid grid-cols-4 gap-2">
        {tiles.map((tile, index) => (
          <Tile key={tile.id} tile={tile} index={index} />
        ))}
      </div>
    </div>
  )
}

export default TileGrid
