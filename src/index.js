#!/usr/bin/env node
import argv from './lib/argv.js'
import webcam from './lib/webcam.js'
import faceDetector from './lib/face-detector.js'
import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

const availablePersons = argv.is('--max') ? parseInt(argv.get('--max')) : 1
const moreCommand = argv.get('--more-command') || 'pwd'
const normalCommand = argv.get('--normal-command') || 'pwd'
const device = argv.get('--device') || '/dev/video0'
const outputdir = argv.get('--output-dir') || './'
const debugMode = argv.is('--debug') || false
const absoluteOutputDir = path.join(process.cwd(), outputdir)

function main() {
  console.log(Date(), 'Nosy-Detector Started...')

  let _faces = undefined
  let tryOver = {
    length: undefined,
    times: 0
  }

  faceDetector.init()
  webcam.start(device)

  webcam.onData(async imageBuffer => {
    const { im, faces } = await faceDetector.detect(imageBuffer)
    if (debugMode) {
      console.log(faces, _faces, tryOver)
    }
    if (faces !== _faces) {
      // something new happened
      if (tryOver.length === faces) {
        // this is not first time
        tryOver.times++
        if (tryOver.times > 5) {
          // set trusted total faces
          _faces = faces
          console.log(Date(), `${faces} Face(s) Detected!`)
          im.save(path.join(outputdir, `${Date.now()}-${faces}.jpg`))
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
process.stdin.resume()