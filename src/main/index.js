const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 700,
		frame: false,
		transparent: true,
		resizable: false,
		maximizable: false,
		webPreferences: {
			nodeIntegration: true,
			nativeWindowOpen: true
		}
	})

	mainWindow.loadFile('index.html')

	mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
	if (mainWindow === null) createWindow()
})