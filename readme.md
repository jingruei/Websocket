## JavaScript | WebSocket 純前端 
### 1.Server 端 - 搭建 WebSocket 環境
####  1-1.下載node js(含npm套件管理工具)

處理好安裝環境後還需要在下載兩個套件，分別是用來開發 Web 框架的 express 和負責處理 WebSocket 協定的 ws ：

```js
npm install express
npm install ws
```
安裝完後可以到專案中的 package.json 中確認是否成功 :

![package](https://github.com/jingruei/repo-images/blob/master/images_for_blogs/package.png?raw=true)

#####  ps:如果是新專案，要先下npm init (懶人可用npm init -y 省略一些建立時會詢問的問題)，產生package.json檔，否則安裝後也不會出現套件

#### 1-2 在專案裡新增一個 JavaScript 檔案 server.js 當作專案的進入點：

```js
//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 3000

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })

//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {

    //連結時執行此 console 提示
    console.log('Client connected')

    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('Close connected')
    })
})
```

沒問題後便可以輸入以下指令執行 server.js ：

```js
node server.js
```

當本機 Server 的指定 Port 被打開時，會先執行我們監聽指定的事件：
![server](https://github.com/jingruei/repo-images/blob/master/images_for_blogs/server.png?raw=true)

### 2.Client 端 - 連接 WebSocket Server
總共需要三個檔案，index.html、index.js、webSocket.js

- index.html 連結兩個檔案
    ```js
    <html>
        <body>
        <script src='index.js'></script>
        <script src='websocket.js'></script>
        </body>
    </html>
    ```
- index.js  用來處理與 WebSocket 的連結：
  ```js
    let ws = new WebSocket('ws://localhost:3000')

    ws.onopen = () => {
        console.log('open connection')
    }

    ws.onclose = () => {
        console.log('close connection')
    }

    //接收 Server 發送的訊息
    ws.onmessage = event => {
        console.log(event)
    }
  ```
- webSocket.js  引用node_modules底下的套件(一開始安裝的)
  ```js
  //import 名稱 from "套件名稱";
  import WebSocket from "ws";
  ```


#### 可參考--https://medium.com/enjoy-life-enjoy-coding/javascript-websocket-%E8%AE%93%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%B2%92%E6%9C%89%E8%B7%9D%E9%9B%A2-34536c333e1b

----------
#####  如果有後端對應就不需要寫server.js