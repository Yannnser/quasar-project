import { bexContent } from 'quasar/wrappers';
const appDiv = document.createElement('div');
appDiv.id = 'q-app';
document.body.appendChild(appDiv);
const script = document.createElement('script');
script.src = chrome.runtime.getURL('www/assets/index-B8YI6H8d.js');
script.type = 'module';
script.crossorigin = true;
document.head.appendChild(script);

export default bexContent((/* bridge */) => {});
