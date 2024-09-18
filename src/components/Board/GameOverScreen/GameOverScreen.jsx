import React from 'react'
import Title from './../../Title/Title'
import RestartButton from '../../RestartButton/RestartButton'

const GameOverScreen = ({ onReset }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <Title>YOU WIN</Title>
      <RestartButton onReset={onReset} />
    </div>
  )
}

export default GameOverScreen
