/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */


import { contextBridge, ipcRenderer } from 'electron'
import { BrowserWindow } from '@electron/remote'


import PouchDB from 'pouchdb-browser'
import Mousetrap from 'mousetrap'
const localStateDB = new PouchDB('local/state');


async function getState(name) {
  try {
    const doc = await localStateDB.get(name)
    console.log(name + '文档存在,成功获取');
    return doc
  } catch (err) {
    if (err.name === 'not_found') {
      console.log(name + '文档不存在,获取失败:');
      return false
    }
    console.error('获取文档错误:' + err);
    return false
  }
}

async function setState(name, data) {
  try {
    const doc = await localStateDB.get(name)
    if (doc === data) {
      console.log(name + '文档存在,状态未改变')
    } else {
      await localStateDB.put({
        _id: doc._id,
        _rev: doc._rev,
        data: data
      })
      console.log(name + '文档存在,覆盖状态')
    }
    return true
  }
  catch (err) {
    if (err.name === 'not_found') {
      await localStateDB.put({
        _id: name,
        data: data
      })
      console.log(name + '文档不存在,保存默认状态');
      return false
    }

    console.error('保存发生错误' + err);

    return false
  }
}


// contextBridge.exposeInMainWorld('jsyamlControl', {
//   async toYaml(json) {
//     const result = yaml.dump(json)
//     return result
//   },

//   async toJson(rawYaml) {
//     const result = yaml.load(rawYaml)
//     return result
//   }
// })

contextBridge.exposeInMainWorld('databaseControl', {
  async getLayoutState() {
    return getState('layoutStore')
  },

  async setLayoutState(data) {
    return setState('layoutStore', data)
  },
  async getDocState() {
    return getState('docStore')
  },
  async setDocState(data) {
    return setState('docStore', data)
  }
})

contextBridge.exposeInMainWorld('ipcControl', {
  ipcOnWindowClose: (cb) => {
    ipcRenderer.on('window-close', () => cb?.())
  },
  ipcRemoveAllListeners: () => ipcRenderer.removeAllListeners,

})

contextBridge.exposeInMainWorld('shortcutsControl', {
  绑定快捷键: (key, func) => {
    Mousetrap.bind(key, func)
  },
})




contextBridge.exposeInMainWorld('windowsControl', {
  minimize() {
    BrowserWindow.getFocusedWindow().minimize()

  },
  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow()

    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  },

  close() {
    BrowserWindow.getFocusedWindow().close()
  }
})

