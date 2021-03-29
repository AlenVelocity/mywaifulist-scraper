<div align="center">
<img src="https://www.itl.cat/pngfile/big/34-348357_re-zero-live-wallpaper-emilia-re-zero-wallpaper.jpg" alt="MWL" width="500" />

# _**MYWAIFULIST-SCRAPER**_

> Unofficial Scraper for [https://mywaifulist.moe/](https://mywaifulist.moe/)
>
>
</div><br/>
<br/>

# 🏮 Installation
```cmd
> npm i mywaifulist-scraper
```

# 🎋 Usage

## Importing
###  💛 JavaScript
```JS
const mwl = require('mywaifulist-scraper')
const mwlClient = new mwl.client()
```
### 💙 TypeScript
```TS 
import * as mwl from 'mywaifulist-scraper'
const mwlClient = new mwl.client()
```

## ☄ Methods
```JS
mwlClient.getCharacter(id) //returns the full into of the given characterid

mwlClient.getAiringAnimes() //returns the list of all airng anime of the season

