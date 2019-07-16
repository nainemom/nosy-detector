import ffmpeg from 'fluent-ffmpeg'

export default {
  process: undefined,
  _dataListerener: (() => {}),
  _busy: false,
  start(device) {
    this.process = ffmpeg(device).inputOptions('-an').outputOption('-f image2pipe').videoFilters('eq=saturation=3:gamma=10:contrast=2:brightness=0')
    const ffstream = this.process.pipe();
    ffstream.on('data', async chunk => {
      if (this._busy || !chunk) {
        return
      }
      this._busy = true
      await this._dataListerener(chunk)
      this._busy = false
    })
  },
  onData(listener) {
    this._dataListerener = listener
  },
  stop() {
    this.process.end()
  }
}