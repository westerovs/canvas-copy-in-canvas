// it doesn't work in codepen!
// it doesn't work in codepen!
// it doesn't work in codepen!

const canvas = document.createElement('canvas')
canvas.id = 'canvas'
canvas.width = 700
canvas.height = 700
document.body.prepend(canvas)
const ctx = canvas.getContext('2d', {willReadFrequently: true})

// create background
const background = new Image()
background.src = './src/bg.jpg'

// ================ 1 способ =================
const getImageURL = (imgData, width, height) => {
  const newCanvas = document.createElement('canvas')
  const ctx = newCanvas.getContext('2d')
  newCanvas.width = width
  newCanvas.height = height

  ctx.putImageData(imgData, 0, 0)
  return newCanvas.toDataURL() //image URL
}

const createCopyImage = (x, y, width, height) => {
  const imageData = ctx.getImageData(x, y, canvas.width, canvas.width)
  
  const copyImage = new Image()
  copyImage.src = getImageURL(imageData, width, height)
  
  return new Promise(resolve => {
    copyImage.addEventListener('load', () => {
      resolve(copyImage)
    })
  })
}

const init = () => {
  ctx.drawImage(background, 0, 0)
  
  createCopyImage(200, 200, 400, 500)
    .then((image) => ctx.drawImage(image, 100, 100))
}

// ================ 2 способ =================
// const crop = (x, y, width, height) => {
//   const ctx = canvas.getContext('2d')
//   const imageData = ctx.getImageData(x, y, width, height)
//
//   console.log(' ------------------ ')
//   console.log(ctx)
//   console.log(' ------------------ ')
//   const newCanvas = document.createElement('canvas')
//   newCanvas.width = width
//   newCanvas.height = height
//
//   const newCtx = newCanvas.getContext('2d')
//   newCtx.putImageData(imageData, 0, 0)
//
//   return newCanvas
// }

// const init = () => {
//   ctx.drawImage(background, 0, 0)
//   ctx.fillStyle = 'green'
//   ctx.fillRect(10, 10, 50, 50)
//
//   const croppedCanvas = crop(0, 0, 200, 200)
//
//   const image = new Image()
//   image.src = croppedCanvas.toDataURL()
//   document.body.append(image)
// }

background.addEventListener('load', init)

