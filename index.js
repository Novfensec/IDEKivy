const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron/main');
const path = require('node:path');

const assets = path.join(__dirname, "assets");

nativeTheme.themeSource = "dark"

const createWindow = () => {
    const root = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(assets, "js", "preload.js"),
        },
    })
    root.loadFile('View/index.html');
    root.maximize();
}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
});

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

app.whenReady().then(() => {
  createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

