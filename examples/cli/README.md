# Canvasmap CLI example

## Basic usage

### Generate vector map

```sh
canvasmap-vector -w {width} -h {height} -o {output}
```

```sh
# In this repo
npm run canvasmap-vector -- -w {width} -h {height} -o {output}
```

### Generate raster map

```sh
canvasmap-raster -w {width} -h {height} -o {output}
```

```sh
# In this repo
npm run canvasmap-raster -- -w {width} -h {height} -o {output}
```

## Options

### Common options

- `-w`, `--width` `<number>`: Map width (**Required**)
- `-h`, `--height` `<number>`: Map height (**Required**)
- `-o`, `--output` `<string>`: Output filename (`.jpg`, `.jpeg`, `.png` or `.webp`)
- `-z`, `--zoom` `<number>`: Map zoom level
- `-c`, `--center` `<number>,<number>`: Map center
- `-zd`, `--zoomDelta` `<number>`: Zoom delta for tile zoom level
- `--title` `<string>`: Map title
- `--attribution` `<string>`: Map attribution

### Vector options

```sh
canvasmap-vector -w 600 -h 600 \
-c 141.8835,39.9269 -z 12 -zd 1 -p bitter \
-le label symbol -o ./dist/vector.png
```

- `-p`, `--palette <string>`: Map palette `default` or `bitter`
- `-l`, `--layers <layers...>`: Vector layer names to render
- `-le`, `--excludeLayers <layers...>`: Vector layer names to NOT render.

### Raster options

```sh
canvasmap-raster -w 600 -h 600 \
-c 138.7333,35.3616 -z 10 -zd 1 \
--tileUrl https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png \
-o ./dist/raster.jpg
```

- `--tileUrl` `<string>`: Raster tile url
- `--tileSize` `<number>`: Raster tile size (default to 256)
