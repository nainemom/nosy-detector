## Nosy Detector
A CLI tool using `opencv` and `ffmpeg` to detect number of faces looking at monitor.
For example you can open full-screen f*ckoff picture when someone else looking at your monitor on behind you. :D


## Dependencies
You have to install `nodejs` >= 8, `opencv` >= 3, and `ffmpeg` natively on your machine. To install `opencv` and `ffmpeg` in you Ubuntu OS you can easily exec:
```terminal
apt install libopencv-dev python-opencv ffmpeg
```

## Installation
```terminal
npm install nosy-detector -g
```


## Usage
```terminal
nosy-detector [options]
```

### Options

| Option Name | Description | Default Value |
|-|-|-|
| --max-faces -mf | Maximum faces available behind system | pwd |
| --command -c | User command that runs when faces more than --max-faces | 1 |
| --device -d | Camera device address | /dev/video0 |
| --output-dir -o | Directory to save photos of face changes. If you won't save detected pictures, pass null. | ./ |
| --debug -t | Using for debug | |
| --helo -h | Show man page | |

### Example
```terminal
nosy-detector -mf 1 -o ./saved_pics" -c "eog fuckoff.png"
```
This command show `fuckoff` picture just when someone looking at your monitor behind you and save her face to `./saved_pics` directory.