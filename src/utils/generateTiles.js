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

  // Массив возможных изображений для плиток
  const images = [bull, dog, goat, horse, monkey, rabbit, rat, rooster]

  // Дублируем каждое изображение, чтобы получить пары
  let tileImages = images.slice(0, totalTiles / 2)
  tileImages = [...tileImages, ...tileImages] // Двойной массив для пар

  // Перемешиваем массив изображений случайным образом
  tileImages = shuffleArray(tileImages)

  // Создаем массив объектов плиток с уникальными id
  const tiles = tileImages.map((image, index) => ({
    id: index,
    image,
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
