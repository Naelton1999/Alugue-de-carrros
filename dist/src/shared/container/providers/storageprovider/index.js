"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = require("multer");
var tsyringe_1 = require("tsyringe");
var localstorageprovider_1 = require("./implements/localstorageprovider");
var s3storageprovider_1 = require("./implements/s3storageprovider");
var dickstorage = {
    local: localstorageprovider_1.Localstorageprovider,
    s3: s3storageprovider_1.S3storageprovider
};
tsyringe_1.container.registerInstance("StorageProvider", multer_1.diskStorage[process.env.disk]);
