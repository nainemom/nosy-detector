#!/usr/bin/env node
import argv from './lib/argv.js'
import webcam from './lib/webcam.js'
import faceDetector from './lib/face-detector.js'
import cmd from 'node-cmd'
import path from 'path'

let availablePersons = parseInt(argv.get('--max-faces') || argv.get('-mf') || 1)
const command = argv.get('--command') || argv.get('-c') || 'pwd'
const device = argv.get('--device') || argv.get('-d') || '/dev/video0'
const outputdir = argv.get('--output-dir') || argv.get('-o') || './'
const debugMode = argv.is('--debug') || argv.is('-t') || false
const absoluteOutputDir = path.join(process.cwd(), outputdir)

function main() {
  console.log(Date(), 'Nosy-Detector Started...')

  let _faces = undefined
  let runningCmd = undefined
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
          im.save(path.join(absoluteOutputDir, `${Date.now()}-${faces}.jpg`))
          if (faces > availablePersons) {
            runningCmd = cmd.get(command)
          } else {
            cmd.get(`kill ${runningCmd.pid + 1}`)
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

if (argv.is('--help') || argv.is('-h')) {
  console.log('')
  console.log('Options:')
  console.log('--max-faces -mf     ', 'Maximum faces available behind system (default 1)')
  console.log('--command -c        ', 'User command that runs when faces more than --max-faces (default "pwd")')
  console.log('--device -d         ', 'Camera device address (default /dev/video0)')
  console.log('--output-dir -o     ', 'Directory to save photos of face changes (default ./)')
  console.log('--debug -t          ', 'Using for debug')
  console.log('--help -h           ', 'Show man page')
  console.log('')
  console.log('Example Usage:')
  console.log('nosy-detector -mf 1 -o ./saved_pics" -c "eog fuckoff.png"')
  console.log('')
} else {
  main()
  process.stdin.resume()
}