import { app, BrowserWindow, Menu } from 'electron';
import os from 'os';
import { initialize } from '@electron/remote/main/index.js'
import { 创建主窗口 } from './窗口';
export const 初始化应用 = () => {
    initialize()

    Menu.setApplicationMenu(null)

    app.on('window-all-closed', () => {
        if (process.platform || os.platform() !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            创建主窗口();
        }
    });
}