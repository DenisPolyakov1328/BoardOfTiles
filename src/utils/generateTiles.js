import bull from './../assets/png/bull.png'
import dog from './../assets/png/dog.png'
import goat from './../assets/png/goat.png'
import horse from './../assets/png/horse.png'
import monkey from './../assets/png/monkey.png'
import rabbit from './../assets/png/rabbit.png'
import rat from './../assets/png/rat.png'
import rooster from './../assets/png/rooster.png'

export const generateTiles = (size = 4) => {
  // Количество плиток (должно быть четным)
  const totalTiles = size * size

  // Список возможных цветов для плиток
  const colors = [bull, dog, goat, horse, monkey, rabbit, rat, rooster]

  // Дублируем каждый цвет, чтобы получить пары
  let tileColors = colors.slice(0, totalTiles / 2)
  tileColors = [...tileColors, ...tileColors] // Двойной массив для пар

  // Перемешиваем массив цветов случайным образом
  tileColors = shuffleArray(tileColors)

  // Создаем массив объектов плиток с уникальными id
  const tiles = tileColors.map((color, index) => ({
    id: index,
    color,
    flipped: false, // Изначально все плитки закрыты
    removed: false // по умолчанию плитка не удалена
  }))

  return tiles
}

// Вспомогательная функция для перемешивания массива
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
