const electron = require('electron');
const {app, BrowserWindow} = electron;

function start(){

    console.log('hello qddg')

    let dimensions = {

        width: 1300,
        //height: 600,
        height:479,
        autoHideMenuBar:true,
        resizable:true,

    };

    let win = new BrowserWindow(dimensions);

    win.loadFile("index.html");

}

app.on('ready', start)
