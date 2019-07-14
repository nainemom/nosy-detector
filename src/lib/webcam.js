import NodeWebcam from 'node-webcam'

export default {
  getPicture() {
    return new Promise((resolve, reject) => {
      NodeWebcam.capture('test', {
        callbackReturn: 'buffer',
        saveShots: true
      }, function( err, data ) {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
}