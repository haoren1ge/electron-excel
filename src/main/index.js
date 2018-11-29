import { app, BrowserWindow,ipcMain  } from 'electron'
import electron from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
//无菜单1
const Menu=electron.Menu

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  //无菜单2
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    height: 863,
    useContentSize: true,
    width: 1600,
    //无边框
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
//最小化
ipcMain.on('min', e=> mainWindow.minimize());
//全屏
ipcMain.on('full', e=> {
  if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
  } else {
      mainWindow.maximize()
  }
});
//退出
ipcMain.on('exit', e=> mainWindow.close());

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
