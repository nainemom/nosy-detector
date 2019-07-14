#!/usr/bin/env node
import argv from './lib/argv.js'
import webcam from './lib/webcam.js'
import faceDetector from './lib/face-detector.js'
import { exec, execSync } from 'child_process'

const availablePersons = argv.is('--max') ? parseInt(argv.get('--max')) : 1
const moreCommand = argv.get('--more-command') || 'pwd'
const normalCommand = argv.get('--normal-command') || 'pwd'
const device = argv.get('--device') || '/dev/video0'

async function main() {
  let _faces = 0
  let tryTimes = 0

  await webcam.start(device)

  const loop = async () => {
    const pic = webcam.getPicture()
    const faces = await faceDetector.detect(pic)
    if (faces !== _faces && tryTimes < 4) {
      tryTimes++
    } else {
      if (_faces !== faces) {
        console.log(`${faces} face(s) looking at camera!`)
        if (faces > availablePersons) {
          exec(moreCommand)
        } else {
          exec(normalCommand)
        }
      }
      _faces = faces
      tryTimes = 0
    }

    process.nextTick(() => {
      setImmediate(loop)
    })
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