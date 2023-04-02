const getRandomItem = (arr) => {
  const randomItem = Math.floor(Math.random() * arr.length);
  console.log('randomItem', randomItem)
  return arr[randomItem]
}

export default getRandomItem