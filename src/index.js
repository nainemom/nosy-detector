#!/usr/bin/env node
import argv from './lib/argv.js'
import webcam from './lib/webcam.js'
import faceDetector from './lib/face-detector.js'
import { exec } from 'child_process'

const maxPersons = argv.is('--max') ? parseInt(argv.get('--max')) : 1
const command = argv.get('--command') || 'echo "oo oo"'

async function main() {
  let facesLength = 0
  let tryTimes = 0

  const loop = async () => {
    const pic = await webcam.getPicture()
    const faces = await faceDetector.detect(pic)
    if (faces !== facesLength && tryTimes < 5) {
      tryTimes++
    } else {
      facesLength = faces
      tryTimes = 0
    }
    if (facesLength > maxPersons) {
      exec(command, (err, stdout, strerr) => {
        console.log(stdout)
      })
    }
    setTimeout(() => {
      setImmediate(loop)
    }, 300)
  }
  loop()
}

main()