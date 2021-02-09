const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const Store = require("electron-store");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const store = new Store({
  defaults: {
    application: {
      active: false,
    },
    tasks: [],
    settings: {
      application: {
        headerText: "",
      },
      apiBase: {
        url: "",
        enabled: false,
      },
      auth: {
        url: "",
        requestBody: "",
      },
    },
  },
});

let mainWindow = null;
let tray = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    frame: false,
    resizable: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    mainWindow.setSkipTaskbar(true);
    createTray();
  });

  mainWindow.on("restore", () => {
    mainWindow.show();
    mainWindow.setSkipTaskbar(false);
    tray.destroy();
  });

  createMenu();
};

const createTray = () => {
  tray = new Tray(__dirname + "/icon.ico");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show Window",
      click: () => mainWindow.show(),
    },
    {
      label: "Start Polling",
      click: () => store.set("application.active", true),
    },
    {
      label: "Stop Polling",
      click: () => store.set("application.active", false),
    },
    {
      label: "Quit",
      click: () => app.quit(),
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    mainWindow.show();
  });
};

const createMenu = () => {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Settings",
          accelerator: "CmdOrCtrl+,",
          click: () => mainWindow.webContents.send("settings-show"),
        },
        { type: "separator" },
        { role: "quit" },
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
        { type: "separator" },
        {
          label: "Toggle Window Resize",
          accelerator: "CmdOrCtrl+Shift+W",
          click: () => mainWindow.setResizable(!mainWindow.resizable),
        },
        { role: "toggleDevTools" },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);

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
