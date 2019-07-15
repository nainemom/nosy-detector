import { exec, spawn } from 'child_process'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'

export default {
  process: undefined,
  _dataListerener: (() => {}),
  _busy: false,
  start(device) {
    this.process = ffmpeg(device).inputOptions('-an').outputOption('-f image2pipe')
    const ffstream = this.process.pipe();
    ffstream.on('data', async chunk => {
      if (this._busy || !chunk) {
        return
      }
      this._busy = true
      await this._dataListerener(chunk)
      setImmediate(() => {
        this._busy = false
      })
    })
  },
  onData(listener) {
    this._dataListerener = listener
  },
  stop() {
    this.process.end()
  }
}