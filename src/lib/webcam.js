import { exec, spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
const cameraPicAddress = path.join(__dirname, '../../camera/img.jpg')

export default {
  process: undefined,
  start() {
    return new Promise((resolve, reject) => {
      this.process = spawn('ffmpeg', ['-y', '-i', '/dev/video0', '-update', '1', '-r', '1', '-s', '800x600', cameraPicAddress])
      setTimeout(resolve, 2000)
    })
  },
  stop() {
    this.process.kill()
  },
  getPicture() {
    return cameraPicAddress
  }
}