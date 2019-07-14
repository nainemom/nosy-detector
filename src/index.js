#!/usr/bin/env node
import argv from './lib/argv.js'
import webcam from './lib/webcam.js'
import faceDetector from './lib/face-detector.js'
import { exec } from 'child_process'

const maxPersons = argv.is('--max') ? parseInt(argv.get('--max')) : 1
const command = argv.get('--command') || 'echo "p"'

async function main() {
  let facesLength = 0
  let tryTimes = 0

  await webcam.start()

  const loop = async () => {
    const pic = await webcam.getPicture()
    // console.log(pic)
    const faces = await faceDetector.detect(pic)
    if (faces !== facesLength && tryTimes < 2) {
      tryTimes++
    } else {
      facesLength = faces
      tryTimes = 0
    }
    if (facesLength > maxPersons) {
      // console.log('ok done')
      exec(command, (err, stdout, strerr) => {
        console.log(stdout.trim())
      })
    }
    setTimeout(() => {
      process.nextTick(loop)
    }, 1000)
  }
  loop()
}

main()

process.on('close', () => {
  webcam.close()
})