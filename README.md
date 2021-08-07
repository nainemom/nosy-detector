# Nosy Detector
A CLI tool using `opencv` and `ffmpeg` to detect number of faces looking at monitor. On other hand, a simple tool to identify who is spying behind you!


### Dependencies
You have to install `nodejs` >= 8, `opencv` >= 3, and `ffmpeg` natively on your machine. To install `opencv` and `ffmpeg` in you Ubuntu OS you can easily exec:
```terminal
apt install libopencv-dev python-opencv ffmpeg
```

### Installation
```terminal
npm install nosy-detector -g
```


### Usage
```terminal
nosy-detector [options]
```

### Options

| Option | Description | Default |
|-|-|-|
| --max-faces -mf | Maximum number of faces allowed to look at monitor | 1 |
| --command -c | User command that runs when faces more than --max-faces | pwd |
| --device -d | Camera device address | /dev/video0 |
| --output-dir -o | Directory to save photos of face changes. If you don't want to save detected pictures, pass null. | ./ |
| --debug -t | Using for debug | |
| --help -h | Show man page | |

### Example
```terminal
nosy-detector --max-faces 1 -o ./saved_pics" -c "eog get-lost.png"
```
This command show `f*ckoff.png` picture just when someone looking at your monitor behind you and save her face to `./saved_pics` directory.