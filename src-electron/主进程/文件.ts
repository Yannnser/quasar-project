import { app, shell } from 'electron';
import path from 'path';

const userDataPath = app.getPath('userData');
export function openUserDataFolder(): void {

    shell.openPath(path.join(userDataPath));
}
