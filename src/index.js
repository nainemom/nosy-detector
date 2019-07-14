#!/usr/bin/env node
import argv from './lib/argv.js'
import webcam from './lib/webcam.js'
import faceDetector from './lib/face-detector.js'
import { exec } from 'child_process'

const maxPersons = argv.is('--max') ? parseInt(argv.get('--max')) : 1
const command = argv.get('--command') || 'pwd'

async function main() {
  let facesLength = 0
  let tryTimes = 0

  await webcam.start()

  const loop = async () => {
    const pic = webcam.getPicture()
    // console.log(pic)
    const faces = await faceDetector.detect(pic)
    if (faces !== facesLength && tryTimes < 4) {
      tryTimes++
    } else {
      if (facesLength !== faces) {
        console.log(`${faces} face(s) looking at camera!`)
        if (facesLength > maxPersons) {
          exec(command)
        }
      }
      facesLength = faces
      tryTimes = 0
    }
    process.nextTick(loop)
    // process.nextTick(() => {
    //   setTimeout(loop, 100)
    // })
  }
  loop()
}
console.log('Initializing...')
main()

process.on('close', () => {
  webcam.close()
  console.log('Good Bye...')
})


process.stdin.resume()