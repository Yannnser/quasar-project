import { BrowserWindow, BaseWindow, WebContentsView } from 'electron';
import { fileURLToPath } from 'node:url';
import { enable } from '@electron/remote/main/index.js'
import path from 'node:path';

let mainWindow: BrowserWindow | undefined;

const currentDir = fileURLToPath(new URL('.', import.meta.url))
export const 创建主窗口 = () => {
    mainWindow = new BrowserWindow({
        icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
        width: 1200,
        height: 750,
        show: false,
        frame: false,
        useContentSize: true,
        backgroundColor: '#303446',
        webPreferences: {
            spellcheck: false,
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.resolve(currentDir,
                path.join(process.env.QUASAR_ELECTRON_PRELOAD_FOLDER, 'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION)),
        },
    });
    enable(mainWindow.webContents)

    mainWindow.webContents.executeJavaScript(`
            document.body.addEventListener('contextmenu', function(e) {
              e.preventDefault(); // 阻止默认行为
            });
          `);

    mainWindow.on('close', async () => {
        mainWindow.webContents.send('window-close');
        // store.set('window.x', mainWindow.getPosition()[0]);
        // store.set('window.y', mainWindow.getPosition()[1]);
        // store.set('window.width', mainWindow.getSize()[0]);
        // store.set('window.height', mainWindow.getSize()[1]);
        // store.set('window.isMaximized', mainWindow.isMaximized());
        mainWindow = null;
    });


    //   if (store.get('window.isMaximized')) {
    //     mainWindow.maximize();
    //   }
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    if (process.env.DEV) {
        mainWindow.loadURL(process.env.APP_URL)
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile('index.html')
    }
}

export const 创建多视图窗口 = () => {
    const win = new BaseWindow(
        {
            icon: path.resolve(currentDir, 'icons/icon.png'),
            width: 1200,
            height: 750,
            frame: false,
            useContentSize: true,
            backgroundColor: '#303446',
        }
    )
    const leftview = new WebContentsView({
        webPreferences: {
            spellcheck: false,
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.resolve(currentDir,
                path.join(process.env.QUASAR_ELECTRON_PRELOAD_FOLDER, 'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION)),
        }
    })

    const rightview = new WebContentsView({
        webPreferences: {
            spellcheck: false,
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.resolve(currentDir,
                path.join(process.env.QUASAR_ELECTRON_PRELOAD_FOLDER, 'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION)),
        }
    })


    leftview.webContents.loadURL(process.env.APP_URL + '/左')
    leftview.webContents.openDevTools()
    rightview.webContents.loadURL(process.env.APP_URL + '/右')
    rightview.webContents.openDevTools()

    win.contentView.addChildView(leftview)
    win.contentView.addChildView(rightview)

    leftview.setBounds({ x: 0, y: 0, width: 600, height: 750 })
    rightview.setBounds({ x: 600, y: 0, width: 600, height: 750 })

}  