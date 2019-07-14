import NodeWebcam from 'node-webcam'

export default {
  getPicture() {
    return new Promise((resolve, reject) => {
      NodeWebcam.capture('photo', {
        callbackReturn: 'buffer'
      }, function( err, data ) {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
}