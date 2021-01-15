import { app, BrowserWindow } from "electron"
import * as path from "path"
import * as url from "url"
import installExtensions, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer"

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: "#191622",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false // cuz it's easier to make the necessary requests from the browser directly
    },
    title: "!song"
  })

  mainWindow.webContents.openDevTools()

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:4000")
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer/index.html"),
        protocol: "file:",
        slashes: true
      })
    )
  }
}

app.on("ready", createWindow);

app.whenReady().then(() => {
  installExtensions(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(error => console.error("An error occured:", error));
});

app.allowRendererProcessReuse = true
