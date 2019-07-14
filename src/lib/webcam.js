import { exec, spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

export default {
  process: undefined,
  start() {
    const motionConfig = path.join(__dirname, '../../config/motion.conf')
    return new Promise((resolve, reject) => {
      this.process = spawn('motion', ['-c', motionConfig])
      process.nextTick(resolve)
    })
  },
  stop() {
    this.process.kill()
  },
  getPicture() {
    const picAddress = path.join(__dirname, '../../camera/img.jpg')
    return new Promise(resolve => {
      const loop = () => {
        if (fs.existsSync(picAddress)) {
          return resolve(picAddress)
        }
        setTimeout(loop, 500)
      }
      loop()
    })
    

    // return new Promise((resolve, reject) => {
    //   NodeWebcam.capture('test', {
    //     callbackReturn: 'buffer',
    //     saveShots: true
    //   }, function( err, data ) {
    //     if (err) {
    //       return reject(err)
    //     }
    //     return resolve(data)
    //   })
    // })
  }
}