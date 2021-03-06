import { app, BrowserWindow, Menu, Tray } from "electron";
import store from "./utils/store";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const windowSize = {
  width: 400,
  height: 700,
};
let mainWindow = null;
let tray = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: windowSize.width,
    height: windowSize.height,
    frame: false,
    resizable: false,
    backgroundColor: "#303030",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  createMenu();
  createTray();
};

const createTray = () => {
  tray = new Tray(__dirname + "/icon.ico");

  const active = store.get("application.active");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: `${active ? "Stop" : "Start"} Polling`,
      click: () => store.set("application.active", !active),
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        mainWindow.destroy();
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
};

const createMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "Settings",
          accelerator: "CmdOrCtrl+,",
          click: () => mainWindow.webContents.send("settings-show"),
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click: () => {
            mainWindow.destroy();
            app.quit();
          },
        },
      ],
    },
    {
      label: "Tasks",
      submenu: [
        {
          label: "Add New",
          accelerator: "F2",
          click: () => mainWindow.webContents.send("tasks-add"),
        },
        {
          label: "Start Polling",
          accelerator: "F3",
          click: () => store.set("application.active", true),
        },
        {
          label: "Stop Polling",
          accelerator: "F4",
          click: () => store.set("application.active", false),
        },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        {
          label: "Reset Window",
          accelerator: "CmdOrCtrl+Shift+E",
          click: () => {
            mainWindow.setSize(windowSize.width, windowSize.height);
            mainWindow.center();
          },
        },
        { type: "separator" },
        {
          label: "Toggle Window Resize",
          accelerator: "CmdOrCtrl+Shift+W",
          click: () => mainWindow.setResizable(!mainWindow.resizable),
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "CmdOrCtrl+Shift+I",
          click: () => mainWindow.webContents.openDevTools({ mode: "detach" }),
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

store.onDidChange("application.active", () => {
  tray.destroy();
  createTray();
});
