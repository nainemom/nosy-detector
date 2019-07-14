import cv from 'opencv'
import path from 'path'

export default {
  detect: function (media) {
    return new Promise((resolve, reject) => {
      cv.readImage(media, function(err, im){
        im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
          if (err) {
            return reject(err)
          }
          // for (let i = 0; i < faces.length; i++) {
          //   var x = faces[i]
          //   im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
          // }
          // im.save('./out.jpg');
          resolve(faces.length)
        });
      })
    })
  }
}