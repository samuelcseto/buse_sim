const {app, BrowserWindow, globalShortcut, dialog, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
var Mousetrap = require('mousetrap');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let setwin;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    icon: "images/dpb.png"
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createSettingsWindow () {
  setwin = new BrowserWindow({
    width: 500,
    height: 300,
    parent: win,
    modal: true,
    show: false,
    resizable: false,
    icon: "images/dpb.png"
  })

  setwin.setMenu(null);

  setwin.loadURL(url.format({
    pathname: path.join(__dirname, 'set.html'),
    protocol: 'file:',
    slashes: true
  }))

  setwin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    setwin = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  createSettingsWindow();
  globalShortcut.register('CommandOrControl+X', () => {
    dialog.showMessageBox(win, {
      type: 'warning',
      buttons: ["Áno", "Nie"],
      defaultId: 0,
      title: "Varovanie!",
      message: "Ste si istý, že chcete túto ukončiť aplikáciu?",
      cancelId: 1
    }, (response) => {
      if (response == 0) { app.quit() }
    });
  })
})

ipcMain.on("sluzba", (event, message) => {
  win.webContents.send("sluzba", message);
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
