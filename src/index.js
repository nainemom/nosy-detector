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

  const loop = async () => {
    const pic = await webcam.getPicture()
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
    process.nextTick(loop)
  }
  loop()
}

main()