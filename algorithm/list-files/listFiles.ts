import fs from 'fs';
import path from 'path';

/**
 * 打印指定目录下文件列表
 * @param dir 目录
 * @param indentation 缩进
 */
export default function listFiles(dir: string, indentation = '') {
  const res = fs.readdirSync(dir);
  while (res.length) {
    const fileOrDir = res.shift()!;
    console.log(indentation + fileOrDir);
    // if (fileOrDir === 'node_modules' || fileOrDir === '.git') continue;
    const fullPath = path.join(dir, fileOrDir);
    if (fs.statSync(fullPath).isDirectory()) {
      listFiles(fullPath, '\t' + indentation);
    }
  }
}
