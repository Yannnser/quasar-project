declare global {

  interface Window {
    windowsControl: {
      minimize: () => void;
      toggleMaximize: () => void;
      close: () => void;
    },
    databaseControl: {
      getLayoutState: () => boolean;
      setLayoutState: (state) => boolean;
      getDocState: () => boolean;
      setDocState: (state) => boolean;
    },
    ipcControl: {
      ipcOnWindowClose: (func) => void;
      ipcRemoveAllListeners: () => void;
      openFolder: () => void;
    },
    shortcutsControl: {
      绑定快捷键: (key, func) => void;
      // 取消绑定快捷键: (key) => void;
      // 取消所有快捷键: () => void;
    }
    // jsyamlControl: {
    //   toYaml: (json) => Promise<string>;
    //   toJson: (rawYaml) => Promise<string>;
    // }
  }
}


export { };
