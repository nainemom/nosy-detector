import cv from 'opencv'
import path from 'path'

export default {
  detect: function (media) {
    return new Promise((resolve, reject) => {
      cv.readImage(media, function(err, im){
        if (err) {
          return reject(err)
        }
        im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
          if (err) {
            return reject(err)
          }
          resolve(faces.length)
        })
      })
    })
  }
}