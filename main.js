const { app, BrowserWindow } = require('electron')


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/Icon/Icon.icns',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('html/index.html')
  //win.setMenu(null);
}
app.whenReady().then(createWindow)