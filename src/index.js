#!/usr/bin/env node
import argv from './lib/argv.js'
import webcam from './lib/webcam.js'
import faceDetector from './lib/face-detector.js'
import { exec, execSync } from 'child_process'

const availablePersons = argv.is('--max') ? parseInt(argv.get('--max')) : 1
const moreCommand = argv.get('--more-command') || 'pwd'
const normalCommand = argv.get('--normal-command') || 'pwd'
const device = argv.get('--device') || '/dev/video0'

function main() {
  console.log('Nosy-Detector Started...')

  let _faces = undefined
  let tryOver = {
    length: undefined,
    times: 0
  }

  faceDetector.init()
  webcam.start(device)

  webcam.onData(async imageBuffer => {
    const faces = await faceDetector.detect(imageBuffer)
    if (faces !== _faces) {
      // something new happened
      if (tryOver.length === faces) {
        // this is not first time
        tryOver.times++
        if (tryOver.times > 10) {
          // set trusted total faces
          _faces = faces
          console.log(`${faces} Face(s) Detected!`)
          if (faces > availablePersons) {
            exec(moreCommand)
          } else {
            exec(normalCommand)
          }
        }
      } else {
        // reset try times
        tryOver.length = faces
        tryOver.times = 0
      }
    }
  })
}

main()

process.on('exit', () => {
  webcam.close()
  console.log('Good Bye...')
})


process.stdin.resume()