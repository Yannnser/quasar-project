import { protocol } from 'electron'
import { promisify } from 'util';
import fs from 'fs';
import os from 'os';
import path from 'path';
export const 定义协议 = () => {

    protocol.registerSchemesAsPrivileged([
        {
            scheme: 'local',
            privileges: {
                secure: true, // 让 Electron 信任这个方式就像信任网站的 HTTPS 一样
                supportFetchAPI: true, // 允许我们像在网页上那样请求资源
                standard: true, // 让这种方式的网址看起来像普通的网址
                bypassCSP: true, // 允许我们绕过一些安全限制
                stream: true, // 允许我们以流的形式读取文件，这对于大文件很有用
            },
        },
        {
            scheme: 'dir',
            privileges: {
                secure: true, // 让 Electron 信任这个方式就像信任网站的 HTTPS 一样
                supportFetchAPI: true, // 允许我们像在网页上那样请求资源
                standard: true, // 让这种方式的网址看起来像普通的网址
                bypassCSP: true, // 允许我们绕过一些安全限制
                stream: true, // 允许我们以流的形式读取文件，这对于大文件很有用
            },
        },
    ]);


}

export const 实现协议 = () => {
    const readdir = promisify(fs.readdir);
    // 一个辅助函数，用于处理不同操作系统的文件路径问题
    function convertPath(originalPath) {
        const match = originalPath.match(/^\/([a-zA-Z])\/(.*)$/);
        if (match) {
            // 为 Windows 系统转换路径格式
            return `${match[1]}:/${match[2]}`;
        } else {
            return originalPath; // 其他系统直接使用原始路径
        }
    }

    async function readDirectory(directoryPath: string): Promise<string[]> {
        const files: string[] = [];

        const entries = await readdir(directoryPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(directoryPath, entry.name);

            if (entry.isDirectory()) {
                const nestedFiles = await readDirectory(fullPath);
                files.push(...nestedFiles);
            } else {
                files.push(fullPath);
            }
        }

        return files;
    }

    protocol.handle('dir', async (request) => {
        const decodedUrl = decodeURIComponent(
            request.url.replace(new RegExp('^dir:/', 'i'), '')
        );

        const fullPath =
            process.platform || os.platform() === 'win32' ? convertPath(decodedUrl) : decodedUrl;

        try {
            const files = await readDirectory(fullPath);
            return new Response(JSON.stringify(files), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    });

    protocol.handle('local', async (request) => {
        const decodedUrl = decodeURIComponent(
            request.url.replace(new RegExp('^local:/', 'i'), '')
        );
        const fullPath =
            process.platform === 'win32' ? convertPath(decodedUrl) : decodedUrl;

        let data = null;
        try {
            data = await fs.promises.readFile(fullPath);
        } catch (e) {
            console.log(e);

        }
        // 异步读取文件内容
        return new Response(data); // 将文件内容作为响应返回
    });
}