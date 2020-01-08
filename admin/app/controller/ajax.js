// 'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
// const pump = require('mz-modules/pump');
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

class UploadAjaxController extends Controller {
    async show() {
        await this.ctx.render('page/ajax.html');
    }

    async upload() {
        const stream = await this.ctx.getFileStream();
        // 基础的目录
        const uplaodBasePath = 'app/public/uploads';
        // 生成文件名
        const filename = `${Date.now()}${Number.parseInt(
            Math.random() * 1000,
        )}${path.extname(stream.filename).toLocaleLowerCase()}`;
        // 生成文件夹
        const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
        function mkdirsSync(dirname) {
            if (fs.existsSync(dirname)) {
                return true;
            } else {
                if (mkdirsSync(path.dirname(dirname))) {
                    fs.mkdirSync(dirname);
                    return true;
                }
            }
        }
        mkdirsSync(path.join(uplaodBasePath, dirname));
        // 生成写入路径
        const target = path.join(uplaodBasePath, dirname, filename);
        // 写入流
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
            this.ctx.body = { url: path.join('/public/uploads', dirname, filename) };
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            this.error();
        }
        // this.success({ url: path.join('/public/uploads', dirname, filename) });
        // const filename = encodeURIComponent(stream.fields.model+Date.now()) + path.extname(stream.filename).toLowerCase();
        // const target = path.join(this.config.baseDir, 'app/public', filename);
        // const writeStream = fs.createWriteStream(target);
        // await pump(stream, writeStream);

        // this.ctx.body = { url: path.join('/public/uploads', dirname, filename) };
    }
}

module.exports = UploadAjaxController;