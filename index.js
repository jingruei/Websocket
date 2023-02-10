// //使用 WebSocket 的網址向 Server 開啟連結
// let ws = new WebSocket('ws://localhost:3001')

// //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
// ws.onopen = () => {
//     console.log('open connection')
// }

// //關閉後執行的動作，指定一個 function 會在連結中斷後執行
// ws.onclose = () => {
//     console.log('close connection')
// }

// //接收 Server 發送的訊息
// ws.onmessage = event => {
//     console.log(event)
// }

let output = document.querySelector(".container");

function start_clock() {
    let wsUri = "ws://localhost:8080/845/clock";
    ws = new WebSocket(wsUri);

    ws.onopen = () => {
        console.log('open connection')
    }

    ws.onmessage = function (evt) {
        last_time = evt.data;
        console.log(last_time);
        // let dom = document.querySelector('#show_space');
        // dom.innerHTML = last_time;
        // console.log(dom);
        writeToScreen("<span style='color: blue;'>" + last_time + "</span>");
    };

    ws.onerror = function (evt) {
        writeToScreen('<span style="color: red;"> ' + 'ERROR:</span> ' + evt.data);
        ws.close();
    };
}

function stop_c1ock() {
    ws.send("stop");
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}